package com.c102.malanglab.game.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum MessageType {
    JOIN, EXIT, @JsonEnumDefaultValue UNKNOWN;

    @JsonCreator
    public static MessageType from(String type) {
        return valueOf(type);
    }

}