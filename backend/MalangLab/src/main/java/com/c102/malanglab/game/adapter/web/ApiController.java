package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.common.response.CustomResponseEntity;
import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.dto.*;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.concurrent.ExecutionException;

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
    public ResponseEntity<GuestRequest> register(@PathVariable Long roomId, @Valid GuestRequest guestRequest) {
        // 이미지 파일 검사
        if (guestRequest.getImage().isEmpty()) {
            throw new IllegalArgumentException("이미지 파일이 전달되지 않아 업로드에 실패했습니다.");
        }

        return new CustomResponseEntity(HttpStatus.OK, gameStatusCase.register(roomId, guestRequest)).convertToResponseEntity();
    }

    @PostMapping("/{roomId}/start")
    public ResponseEntity<Boolean> start(
            @PathVariable Long roomId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId) {
        if(!gameStatusCase.isGameManager(roomId, userId)) {
            throw new IllegalStateException("게임을 시작할 권한을 가지고 있지 않습니다.");
        }
        gameStatusCase.start(roomId);
        return new CustomResponseEntity(HttpStatus.OK, true).convertToResponseEntity();
    }

    @PostMapping("/{roomId}/destory")
    public ResponseEntity<Void> destory(
            @PathVariable Long roomId,
            @RequestBody String userId
    ) {
        if(!gameStatusCase.isGameManager(roomId, userId)) {
            throw new IllegalStateException("게임을 시작할 권한을 가지고 있지 않습니다.");
        }
        gameStatusCase.destory(roomId);
        return new CustomResponseEntity(HttpStatus.NO_CONTENT, null).convertToResponseEntity();
    }
    @PostMapping("/{roomId}/user/out")
    public ResponseEntity<Void> userOut(
            @PathVariable Long roomId,
            @RequestBody String token
    ) {
        gameStatusCase.exitMember(roomId, token);
        return new CustomResponseEntity(HttpStatus.NO_CONTENT, null).convertToResponseEntity();
    }

    /**
     * 게스트는 단어를 입력합니다.
     * POST : /game/{roomId}/word
     * @PathVariable roomId : 방 번호 (PIN 번호)
     * @RequestHeader userId : 유저 아이디 토큰
     * @RequestBody wordRequest : 입력 요청 단어
     * @return
     */
    @PostMapping("/{roomId}/word")
    public ResponseEntity<Void> inputWord(
            @PathVariable Long roomId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId,
            @RequestBody @Valid WordRequest wordRequest
            ) {

        gameStatusCase.inputWord(roomId, userId, wordRequest);
        return new CustomResponseEntity(HttpStatus.OK, null).convertToResponseEntity();
    }

    /**
     * 호스트는 단어의 수를 가져옵니다
     * GET : /game/{roomId}/wordcount
     * @PathVariable roomId : 방 번호 (PIN 번호)
     * @RequestHeader userId : 유저 아이디 토큰
     * @return
     */
    @GetMapping("/{roomId}/wordcount")
    public ResponseEntity<Long> totalWordCount(
            @PathVariable Long roomId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId
    ) {

        Long result = gameStatusCase.totalWordCount(roomId, userId);
        return new CustomResponseEntity(HttpStatus.OK, result).convertToResponseEntity();
    }

    /**
     * 호스트는 입력 단어 결과를 가져옵니다
     * GET : /game/{roomId}/wordresult
     * @PathVariable roomId : 방 번호 (PIN 번호)
     * @RequestHeader userId : 유저 아이디 토큰
     * @return
     */
    @GetMapping("/{roomId}/wordresult")
    public ResponseEntity<Object> totalWordResult(
            @PathVariable Long roomId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String userId
    ) {
        // gameStatusCase
        // TODO: * 여진이한테 어떤 형식으로 넘겨줄 껀지 물어보기 (라운드별) (단어 : 입력 빈도)
        // TODO: ResponseEntity 자료형 고치기
        HashMap<String, Integer> temp = new HashMap<>();

        return new CustomResponseEntity(HttpStatus.OK, temp).convertToResponseEntity();
    }

}