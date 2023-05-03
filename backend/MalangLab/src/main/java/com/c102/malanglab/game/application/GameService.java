package com.c102.malanglab.game.application;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService implements GameStatusCase {
    private final GamePort gamePort;
    private final GameBroadCastPort gameBroadCastPort;

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
    public Room get(final Long roomId) {
        return gamePort.findById(roomId);
    }

    @Override
    public void join(Long roomId, String userId) {
        gameBroadCastPort.alertJoin(roomId, userId);
    }

    @Scheduled(fixedDelay = 1000)
    public void sendServerTime() {
        gameBroadCastPort.alertServerTime(System.currentTimeMillis());
    }
}
