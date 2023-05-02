package com.c102.malanglab.game.application;

import com.c102.malanglab.common.response.CustomResponseEntity;
import com.c102.malanglab.game.application.port.GamePort;
import com.c102.malanglab.game.application.port.in.GameCreateCase;
import com.c102.malanglab.game.application.port.in.GameJoinCase;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;
import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ThreadLocalRandom;

import static com.c102.malanglab.game.dto.MessageType.JOIN;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameService {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final GamePort gamePort;

    private Logger logger = LoggerFactory.getLogger(GameService.class);

    @PostMapping
    @Transactional
    public ResponseEntity<Room> create(
            @RequestBody CreateRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId) {

        // 방 생성하기
        Room room = new Room(generateRoomId(), request.title(), userId, request.mode(), request.settings());

        // 방 생성 유효성 검사하기
        RoomValidator.validate(room);

        // 게임 저장하기
        Room roomCreated = gamePort.save(room);

        // 방 생성하기 로그
        logger.info(String.valueOf(roomCreated));

        return new CustomResponseEntity(HttpStatus.CREATED, room).convertToResponseEntity();
    }
    public long generateRoomId() {
        return ThreadLocalRandom.current().nextLong(100000, 1000000);
    }


    @GetMapping("/{roomId}")
    public ResponseEntity<Room> get(@PathVariable Long roomId) {
        Room room = gamePort.findById(roomId);
        return ResponseEntity.ok(room);
    }

    @MessageMapping("/{roomId}")
    public void messageHandler(@DestinationVariable Long roomId, Message message) {
        switch(message.getType()) {
            case JOIN:
                break;
            case EXIT:
                break;
            default:
                break;
        }
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, message);
    }
    @MessageMapping("/hello")
    public void sayHello() {
        simpMessageSendingOperations.convertAndSend("/topic/hello", new Message(JOIN, "hello world", "123123123"));
    }
}
