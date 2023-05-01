package com.c102.malanglab.game.application;

import com.c102.malanglab.game.application.port.GamePort;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameService {

    private final GamePort gamePort;

    @PostMapping
    @Transactional
    public ResponseEntity<Room> create(
            @RequestBody CreateRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId) {

        Room room = new Room(generateRoomId(), request.title(), userId, request.mode(), request.settings());
        RoomValidator.validate(room);
        // 게임 저장하기
        Room roomCreated = gamePort.save(room);

        System.out.println(roomCreated);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }
    public long generateRoomId() {
        return ThreadLocalRandom.current().nextLong(100000, 1000000);
    }


    @GetMapping("/{roomId}")
    public ResponseEntity<Room> get(@PathVariable Long roomId) {
        Room room = gamePort.findById(roomId);
        return ResponseEntity.ok(room);
    }
}
