package com.c102.malanglab.token.application.port;

import com.c102.malanglab.token.domain.AccessToken;

public interface AccessTokenPort {
    AccessToken getRandomUserToken();

    AccessToken getToken(String key);

    void deleteToken(String key);

    AccessToken refreshToken(String key);
}
