package com.c102.malanglab.game;

import com.c102.malanglab.ApiTest;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static com.c102.malanglab.game.GameSteps.*;
import static com.c102.malanglab.token.TokenSteps.토큰삭제요청;
import static com.c102.malanglab.token.TokenSteps.토큰생성요청;
import static org.assertj.core.api.Assertions.assertThat;

public class GameApiTest extends ApiTest {

    @Test
    public void 게임생성() {
        // 토큰 생성
        final var tokenResponse = 토큰생성요청();
        String token = tokenResponse.body().jsonPath().get("data.token");
        // 게임 생성 요청
        final var request = 게임생성요청_생성();
        // 게임 생성
        final var response = 게임생성요청(request, token);
        // 방 정보 리턴
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        // 토큰 삭제
        토큰삭제요청(token);
    }

    @Test
    public void 게임조회() {
        final var tokenResponse = 토큰생성요청();
        String token = tokenResponse.body().jsonPath().get("data.token");
        게임생성요청(게임생성요청_생성(), token);

        final var response = 게임조회요청(1L, token);

        System.out.println(response.body());
        // 토큰 삭제
        토큰삭제요청(token);
    }
}
