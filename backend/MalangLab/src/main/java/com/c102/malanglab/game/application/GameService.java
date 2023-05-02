package com.c102.malanglab.game.application;

import com.c102.malanglab.common.response.CustomResponseEntity;
import com.c102.malanglab.game.application.port.GamePort;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameService {

    private final GamePort gamePort;

    private Logger logger = LoggerFactory.getLogger(GameService.class);

    /**
     * 게임 방을 생성합니다
     *
     * @return ResponseEntity<Room>
     */
    @PostMapping
    @Transactional
    public ResponseEntity<Room> createRoom(
            @RequestBody CreateRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId) {

        // TODO: 방 PIN 번호 중복 검사
        Long roomNumber = 0L;
//        try {
//            while(true) {
//                roomNumber = generateRoomId();
//
//                // TODO: Redis 중복 검사 코드
//                if (                           ) { break; }
//            }
//        } catch(Exception e) {
//            return new CustomResponseEntity(HttpStatus.SERVICE_UNAVAILABLE, "실패", null).convertToResponseEntity();
//        }

        // TODO: roomNumber에 중복 검사를 마친 PIN 번호를 할당하고, new Room(roomNumber, ... )로 수정해주기
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

    /**
     * 방 번호(PIN)를 생성합니다
     *
     * @return Long
     */
    public long generateRoomId() {
        return ThreadLocalRandom.current().nextLong(100000, 1000000);
    }

    /**
     * 방 번호(PIN)를 통해 참여 하기 요청에 답합니다
     *
     * @return ResponseEntity<Room>
     */
    @GetMapping("/{roomId}")
    public ResponseEntity<Room> checkRoom(@PathVariable Long roomId) {
        // TODO: Redis에서 방 PIN 유무 검사 후 없는 PIN 번호에 대한 요청인 경우 400 BAD REQUEST 응답하기
//        if (           ) {
//            return new CustomResponseEntity(HttpStatus.BAD_REQUEST, "실패", null).convertToResponseEntity();
//        }

        
        return new CustomResponseEntity(HttpStatus.OK).convertToResponseEntity();
    }
}
