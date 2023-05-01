package com.c102.malanglab.token;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

import static com.c102.malanglab.token.TokenSteps.*;
import static org.junit.jupiter.api.Assertions.*;

public class TokenApiTest {

    @Test
    public void 토큰생성() {
        // 토큰 생성
        final var response = 토큰생성요청();
        // 토큰 정보 리턴
        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        String token = response.body().jsonPath().get("data.token");
        assertNotNull(token, () -> "요청완료 시, 토큰이 생성됩니다.");

        // 토큰 제거
        토큰삭제요청(token);
    }

    @Test
    public void 토큰갱신() {
        final var response = 토큰생성요청();
        String token = response.body().jsonPath().get("data.token");
        LocalDateTime expiredAt = LocalDateTime.parse(response.body().jsonPath().get("data.expiredAt"));

        final var nextResponse = 토큰갱신요청(token);
        LocalDateTime nextExpiredAt = LocalDateTime.parse(nextResponse.body().jsonPath().get("data.expiredAt"));

        assertTrue(expiredAt.isBefore(nextExpiredAt), () -> "토큰 갱신 시, expiredAt이 더 늘어납니다.");
        // 토큰 제거
        토큰삭제요청(token);
    }

}
