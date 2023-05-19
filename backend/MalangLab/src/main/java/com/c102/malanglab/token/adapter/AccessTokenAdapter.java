package com.c102.malanglab.token.adapter;

import com.c102.malanglab.token.application.port.AccessTokenPort;
import com.c102.malanglab.token.domain.AccessToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class AccessTokenAdapter implements AccessTokenPort {
    private final int TOKEN_RETENTION_DAY = 1;
    private final String TOKEN_PREFIX = "token:";
    private final String MALANG_PREFIX = "malang-";
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;

    @Override
    public AccessToken getRandomUserToken() {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        try {
            while(true) {
                AccessToken token = generateAccessToken();
                Boolean success = valueOperations.setIfAbsent(
                        getTokenKey(token.getToken()),
                        objectMapper.writeValueAsString(token)
                );
                if(success) {
                    redisTemplate.expireAt(getTokenKey(token.getToken()),
                            Date.from(token.getExpiredAt().atZone(ZoneId.systemDefault()).toInstant()));
                    return token;
                }
                Thread.sleep(100);
            }
        } catch (JsonProcessingException e) {
            log.error("랜덤 토큰 저장 JSON Processing Exception 발생 -> {}", e.getMessage());
        } catch (InterruptedException e) {
            log.error("랜덤 토큰 저장 중복발생으로 Thread Sleep 중 Exception 발생 -> {}", e.getMessage());
        }
        return null;
    }

    @Override
    public AccessToken getToken(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        AccessToken token = null;
        try {
            String tokenString = valueOperations.get(getTokenKey(key));
            if(Objects.isNull(tokenString)) {
                throw new IllegalArgumentException("존재하지 않는 토큰입니다.");
            }

            token = objectMapper.readValue(tokenString, AccessToken.class);
        } catch (JsonProcessingException e) {
            log.error("Token 조회 중 JSON Processing Exception 발생 -> {}", e.getMessage());
        }
        return token;
    }

    @Override
    public void deleteToken(String key) {
        redisTemplate.delete(getTokenKey(key));
    }

    @Override
    public AccessToken refreshToken(String key) {
        try {
            AccessToken token = getToken(key);
            token.setExpiredAt(LocalDateTime.now().plusDays(TOKEN_RETENTION_DAY));

            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
            valueOperations.set(getTokenKey(key), objectMapper.writeValueAsString(token));
            redisTemplate.expireAt(getTokenKey(key),
                    Date.from(token.getExpiredAt().atZone(ZoneId.systemDefault()).toInstant()));
            return token;
        } catch (JsonProcessingException e) {
            log.error("랜덤 토큰 저장 JSON Processing Exception 발생 -> {}", e.getMessage());
        }
        return null;
    }

    private String getTokenKey(String key) {
        return TOKEN_PREFIX + key;
    }

    private AccessToken generateAccessToken() {
        LocalDateTime current = LocalDateTime.now();
        return AccessToken.builder()
                .token(MALANG_PREFIX + String.valueOf(UUID.randomUUID()))
                .createdAt(current)
                .expiredAt(current.plusDays(TOKEN_RETENTION_DAY))
                .build();
    }
}
