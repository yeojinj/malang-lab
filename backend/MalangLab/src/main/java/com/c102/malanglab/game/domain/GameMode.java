package com.c102.malanglab.game.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum GameMode {
    TEAM, SOLO, @JsonEnumDefaultValue UNKOWN;

    @JsonCreator
    public static GameMode from(String s) {
        return GameMode.valueOf(s.toUpperCase());
    }
}
