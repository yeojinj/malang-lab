package com.c102.malanglab.game.application;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.application.port.out.GameUniCastPort;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Room;

import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.websocket.GuestDto;
import com.c102.malanglab.game.dto.RoomRequest;
import com.c102.malanglab.game.dto.RoomResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService implements GameStatusCase {
    private final GamePort gamePort;
    private final GameBroadCastPort gameBroadCastPort;
    private final GameUniCastPort gameUniCastPort;

    @Override
    public RoomResponse create(RoomRequest request, String hostId) {
        // 방 생성하기
        Room room = new Room(request.getName(), hostId, request.getMode(), request.getSettings().size(), request.getSettings());
        // 방 생성 유효성 검사하기
        RoomValidator.validate(room);
        // 게임 저장하기
        Room roomCreated = gamePort.save(room);
        // 방 생성하기 로그
        log.info(String.valueOf(roomCreated));

        RoomResponse roomResponse = new RoomResponse(roomCreated.getId(), roomCreated.getName(), roomCreated.getHostId(), roomCreated.getMode(), roomCreated.getSettings(), roomCreated.getGuests());
        return roomResponse;
    }


    @Override
    public RoomResponse get(final Long roomId) {
        Room room = gamePort.findById(roomId);
        RoomResponse roomResponse = new RoomResponse(room.getId(), room.getName(), room.getHostId(), room.getMode(), room.getSettings(), room.getGuests());
        return roomResponse;
    }


    @Override
    public void start(Long roomId, String hostId) {
        // 방 조회
        Room room = gamePort.findById(roomId);
        // 관리자인지 검증
        if(room.isHost(hostId)) {
            throw new IllegalStateException("게임 시작권한이 없습니다.");
        }
        // 게임 시작
        gameBroadCastPort.start(roomId, null);
    }


    @Override
    public void joinMember(Long roomId, String userId, Message message) {
        // 1. 게임이 현재 실행중인지 확인합니다.
        Room room = gamePort.join(roomId);
        gamePort.addGuestList(room.getId(), userId);

        // 2. 방에 참여자 목록을 가져옵니다.
        List<GuestDto> guestList = gamePort.getGuestList(room.getId()).stream()
                .map(g -> new GuestDto(g.getId(), g.getNickname(), g.getImagePath()))
                .collect(Collectors.toList());

        // 3. 게임 참여자의 참여 정보를 알립니다.
        gameBroadCastPort.alertJoinMember(room.getId(), message);

        // 4. 참여 당사자에게 참여자 리스트를 전달합니다.
        gameUniCastPort.alertGuestList(userId, new Message<List<GuestDto>>(Message.MessageType.GUEST_LIST, guestList));
    }

    @Override
    public void exitMember(Long roomId, String userId) {
        // 1. 게임 참여자의 정보를 삭제합니다.
        gamePort.removeUser(roomId, userId);

        // 2. 게임 참여자의 이탈 정보를 알립니다.
        gameBroadCastPort.alertExitMember(roomId, new Message<GuestDto>(
                Message.MessageType.EXIT, GuestDto.of(userId)
        ));
    }

//    @Scheduled(fixedDelay = 1000)
//    public void sendServerTime() {
//        gameBroadCastPort.alertServerTime(System.currentTimeMillis());
//    }
}
