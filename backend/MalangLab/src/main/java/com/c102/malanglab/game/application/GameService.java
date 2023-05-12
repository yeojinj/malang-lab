package com.c102.malanglab.game.application;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.application.port.out.GameUniCastPort;
import com.c102.malanglab.game.application.port.out.S3Port;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Room;

import com.c102.malanglab.game.domain.Round;
import com.c102.malanglab.game.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
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
    public void destory(Long roomId) {
        // 모두에게 방이 삭제됨을 공지
        gameBroadCastPort.alertRoomDestory(roomId, new Message(Message.MessageType.DESTORY, null));
        // 방에 등록된 모든 이미지, Persistent 제거
        CompletableFuture<Void> s3ImageRemove = CompletableFuture.runAsync(() -> {
            s3Port.removeAll(roomId);
        });
        CompletableFuture<Void> persistentRemove = CompletableFuture.runAsync(() -> {
            gamePort.removeRoom(roomId);
        });

        try {
            CompletableFuture.allOf(s3ImageRemove, persistentRemove).get();
        } catch (InterruptedException|ExecutionException e) {
            e.printStackTrace();
            throw new IllegalStateException("방을 삭제하는 데 에러가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public GuestResponse register(Long roomId, GuestRequest guestRequest) {
        Room room = gamePort.findById(roomId);
        if(Objects.isNull(room)) {
            throw new IllegalArgumentException("존재하지 않는 방입니다.");
        }

        // 닉네임 중복 검사
        Boolean check = gamePort.setNickname(room.getId(), guestRequest.getId(), guestRequest.getNickname());
        if (!check) {
            throw new IllegalArgumentException("중복된 닉네임이 존재합니다.");
        }
        // S3 업로드
        String url = s3Port.setImgPath(guestRequest.getImage(), "room/" + roomId + "/");

        Guest newGuest = new Guest(guestRequest.getId(), guestRequest.getNickname(), url);
        room.addGuest(newGuest);

        GuestResponse guestResponse = new GuestResponse(
                guestRequest.getId(),
                newGuest.getNickname(),
                newGuest.getImagePath(),
                room.getId());

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
        // 1. 게임 참여자의 이탈 정보를 알립니다.
        gameBroadCastPort.alertExitMember(roomId, new Message<GuestRequest>(
                Message.MessageType.EXIT, GuestRequest.of(userId)
        ));
        // 2. 계정 정보를 가져옵니다.
        Guest guest = gamePort.getGuest(userId);
        // 3. 계정의 이미지를 S3에서 제거합니다.
        s3Port.removeImgPath(guest.getImagePath());
        // 4. 게임 참여자의 정보를 00합니다.
        // TODO: gamePort.removeUser(roomId, userId);
    }

    @Override
    public void inputWord(Long roomId, String userId, WordRequest wordRequest) {

        // 단어 입력 persistence 처리를 합니다.
        // - 중복 단어 (0)
        // - 입력 성공 (1)
        // - 히든 단어 입력 성공 (2)
        int result = gamePort.inputWord(roomId, userId, wordRequest.getWord(), wordRequest.getTime());

        switch(result){
            case 0:
                // 중복 단어 입력 시 예외 처리를 합니다.
                throw new IllegalArgumentException("중복 입력입니다.");
            case 1: case 2:
                // 방장에게 데이터 베이스 확인 요청을 보냅니다.
                gameUniCastPort.alertRoomManager(
                        Long.toString(roomId),
                        new Message<Object>(Message.MessageType.CHECK_DB, null)
                );
                return;
            default:
                return;
        }

    }

    @Override
    public Long totalWordCount(Long roomId, String userId) {
        if (!gamePort.isGameManager(roomId, userId)) {
            throw new IllegalArgumentException("호스트가 아닌 게스트의 요청입니다.");
        }

        Long result = gamePort.totalWordCount(roomId);
        return result;
    }

    @Override
    public Object totalWordResult(Long roomId, String userId) {
        if (!gamePort.isGameManager(roomId, userId)) {
            throw new IllegalArgumentException("호스트가 아닌 게스트의 요청입니다.");
        }

        // TODO: 수정하기
        Object result = gamePort.totalWordResult(roomId);
        return result;
    }

//    @Scheduled(fixedDelay = 1000)
//    public void sendServerTime() {
//        gameBroadCastPort.alertServerTime(System.currentTimeMillis());
//    }
}
