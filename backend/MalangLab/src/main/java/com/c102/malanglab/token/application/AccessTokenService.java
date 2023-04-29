package com.c102.malanglab.token.application;

import com.c102.malanglab.common.response.CustomResponseEntity;
import com.c102.malanglab.token.application.port.AccessTokenPort;
import com.c102.malanglab.token.domain.AccessToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class AccessTokenService {

    private final AccessTokenPort accessTokenPort;

    /**
     * 유저에게 토큰을 발급해줍니다.
     * 토큰은 게임 생성/접속할 시, 유저의 고유 키가 됩니다.
     * @return AccessToken
     */
    @PostMapping
    public ResponseEntity<AccessToken> createToken() {
        AccessToken userToken = accessTokenPort.getRandomUserToken();
        return new CustomResponseEntity(HttpStatus.CREATED, userToken).convertToResponseEntity();
    }

    /**
     * 토큰을 조회합니다.
     * @RequestHeader(value = "Authorization") String token
     * @return AccessToken
     */
    @GetMapping
    public ResponseEntity<AccessToken> getToken(@RequestHeader(value = "Authorization") String token) {
        return new CustomResponseEntity(accessTokenPort.getToken(token)).convertToResponseEntity();
    }

    /**
     * 토큰을 제거합니다.
     * @DeleteMapping은 default 설정
     * @RequestHeader(value = "Authorization") String token
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteToken(@RequestHeader(value = "Authorization") String token) {
        accessTokenPort.deleteToken(token);
        return new CustomResponseEntity(HttpStatus.NO_CONTENT).convertToResponseEntity();
    }

    /**
     * 토큰 만료기간을 연장합니다.
     * @GetMapping은 특수 용도
     * @PutMapping은 default 설정
     * @RequestHeader(value = "Authorization") String token
     * @return
     */
    @GetMapping("/refresh")
    public ResponseEntity<AccessToken> refreshToken(@RequestHeader(value = "Authorization") String token) {
        AccessToken accessToken = accessTokenPort.refreshToken(token);

        return new CustomResponseEntity(accessToken).convertToResponseEntity();
    }
}
