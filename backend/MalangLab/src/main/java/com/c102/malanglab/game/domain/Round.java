package com.c102.malanglab.game.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Round {
    Setting setting;
    Boolean isLast;
}
