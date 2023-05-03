package com.c102.malanglab.game.application;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.application.port.out.GameUniCastPort;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;
import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.websocket.GuestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService implements GameStatusCase {
    private final GamePort gamePort;
    private final GameBroadCastPort gameBroadCastPort;
    private final GameUniCastPort gameUniCastPort;

    @Override
    public Room create(CreateRequest request, String userId) {
        // 방 생성하기
        Room room = new Room(generateRoomId(), request.title(), userId, request.mode(), request.settings());
        // 방 생성 유효성 검사하기
        RoomValidator.validate(room);
        // 게임 저장하기
        Room roomCreated = gamePort.save(room);
        // 방 생성하기 로그
        log.info(String.valueOf(roomCreated));

        return roomCreated;
    }

    public long generateRoomId() {
        return ThreadLocalRandom.current().nextLong(100000, 1000000);
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
    public Room get(final Long roomId) {
        return gamePort.findById(roomId);
    }

    @Override
    public void joinMember(Long roomId, String userId, Message message) {
        // 1. 게임이 현재 실행중인지 확인합니다.

        // 2. 게임 참여자의 참여 정보를 알립니다.
        gameBroadCastPort.alertJoinMember(roomId, message);

        // 3. 방에 참여자 목록을 가져옵니다.
        List<GuestDto> guestList = new ArrayList<>();
        // 4. 참여 당사자에게 참여자 리스트를 전달합니다.
        gameUniCastPort.alertGuestList(
                userId,
                new Message<List<GuestDto>>(Message.MessageType.GUEST_LIST, guestList)
        );
    }

    @Override
    public void exitMember(Long roomId, String userId) {
        // 1. 게임 참여자의 정보를 삭제합니다.

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
