package com.c102.malanglab.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoundResponse {
    String keyword;  // 제시어
    int timeLimit;   // 제한 시간
    int round;       // 현재 턴 수
    boolean isLast;  // 마지막 턴인지 여부
}
