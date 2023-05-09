package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.common.response.CustomResponseEntity;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.dto.RoomRequest;
import com.c102.malanglab.game.dto.RoomResponse;
import com.c102.malanglab.game.dto.GuestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class ApiController {
    private final GameStatusCase gameStatusCase;

    /**
     * 호스트는 방을 생성합니다
     * POST : /game
     * @RequestBody RoomRequest : 방 생성 정보
     * @RequestHeader(HttpHeaders.AUTHORIZATION) : 호스트 아이디
     * @return
     */
    @PostMapping
    public ResponseEntity<RoomResponse> create(
            @RequestBody RoomRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId) {
        RoomResponse roomResponse = gameStatusCase.create(request, userId);
        return new CustomResponseEntity(HttpStatus.CREATED, roomResponse).convertToResponseEntity();
    }

    /**
     * 게스트는 방에 들어가기 위해 PIN을 입력합니다
     * GET : /game/{roomId}
     * @PathVariable roomId : 방 번호 (PIN 번호)
     * @return
     */
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> get(@PathVariable Long roomId) {
        return new CustomResponseEntity(HttpStatus.OK, gameStatusCase.get(roomId)).convertToResponseEntity();
    }

    /**
     * 게스트는 방에 들어가기 위해 PIN을 입력합니다
     * GET : /game/{roomId}
     * @PathVariable roomId : 방 번호 (PIN 번호)
     * @return
     */
    @PostMapping("/{roomId}")
    public ResponseEntity<GuestRequest> register(@PathVariable Long roomId, @RequestBody GuestRequest guestRequest) {
        return new CustomResponseEntity(HttpStatus.OK, gameStatusCase.register(roomId, guestRequest)).convertToResponseEntity();
    }

    @PostMapping("/{roomId}/start")
    public ResponseEntity<Boolean> start(
            @PathVariable Long roomId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId) {

        gameStatusCase.start(roomId, userId);
        return new CustomResponseEntity(HttpStatus.OK, true).convertToResponseEntity();
    }
}