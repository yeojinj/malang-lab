package com.c102.malanglab.game.application;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.application.port.out.GameUniCastPort;
import com.c102.malanglab.game.application.port.out.S3Port;
import com.c102.malanglab.game.domain.Room;

import com.c102.malanglab.game.domain.Round;
import com.c102.malanglab.game.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;



@Slf4j
@Service
@RequiredArgsConstructor
public class GameService implements GameStatusCase {
    private final GamePort gamePort;
    private final GameBroadCastPort gameBroadCastPort;
    private final GameUniCastPort gameUniCastPort;
    private final S3Port s3Port;

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
    public boolean isGameManager(Long roomId, String userId) {
        return gamePort.isGameManager(roomId, userId);
    }


    @Override
    public RoomResponse get(final Long roomId) {
        Room room = gamePort.join(roomId);
        RoomResponse roomResponse = new RoomResponse(room.getId(), room.getName(), room.getHostId(), room.getMode(), room.getSettings(), room.getGuests());
        return roomResponse;
    }

    @Override
    public GuestResponse register(final Long roomId, final GuestRequest guestRequest) {
        // 닉네임 중복 검사
        Boolean check = gamePort.setNickname(roomId, guestRequest.getId(), guestRequest.getNickname());
        if (!check) {
            throw new IllegalArgumentException("중복된 닉네임이 존재합니다.");
        }

        // S3 업로드
        String url = s3Port.setImgPath(guestRequest.getImage());

        GuestResponse guestResponse = new GuestResponse(guestRequest.getId(),
                                                        guestRequest.getNickname(),
                                                        url,
                                                        roomId);
        return guestResponse;
    }

    @Override
    public void start(Long roomId) {
        // 게임 현재 라운드 가져오기
        Round round = gamePort.checkRound(roomId);

        RoundResponse roundDto = RoundResponse.builder()
                .round(round.getSetting().getRound())
                .keyword(round.getSetting().getKeyword())
                .timeLimit(round.getSetting().getTime())
                .isLast(round.getIsLast())
                .build();

        // 게임 시작 시, 라운드 정보 돌려주기
        gameBroadCastPort.start(roomId, new Message<RoundResponse>(Message.MessageType.ROUND_START, roundDto));
    }


    @Override
    public void joinMember(Long roomId, String userId, Message message) {
        // 1. 게임이 현재 실행중인지 확인합니다.
        Room room = gamePort.join(roomId);
        gamePort.addGuestList(room.getId(), userId);

        // 2. 방에 참여자 목록을 가져옵니다.
        List<GuestResponse> guestList = gamePort.getGuestList(room.getId()).stream()
                .map(g -> new GuestResponse(g.getId(), g.getNickname(), g.getImagePath(), room.getId()))
                .collect(Collectors.toList());

        // 3. 게임 참여자의 참여 정보를 알립니다.
        gameBroadCastPort.alertJoinMember(room.getId(), message);

        // 4. 참여 당사자에게 참여자 리스트를 전달합니다.
        gameUniCastPort.alertGuestList(
                userId,
                new Message<List<GuestResponse>>(Message.MessageType.GUEST_LIST, guestList)
        );

    }

    @Override
    public void exitMember(Long roomId, String userId) {
        // 1. 게임 참여자의 정보를 삭제합니다.
        gamePort.removeUser(roomId, userId);

        // 2. 게임 참여자의 이탈 정보를 알립니다.
        gameBroadCastPort.alertExitMember(roomId, new Message<GuestRequest>(
                Message.MessageType.EXIT, GuestRequest.of(userId)
        ));
    }

//    @Scheduled(fixedDelay = 1000)
//    public void sendServerTime() {
//        gameBroadCastPort.alertServerTime(System.currentTimeMillis());
//    }
}
