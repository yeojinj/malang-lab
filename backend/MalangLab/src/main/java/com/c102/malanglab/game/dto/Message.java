package com.c102.malanglab.game.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import lombok.*;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Message<T> {
    private MessageType type;
    private T body;

    public enum MessageType {
        JOIN, EXIT, GUEST_LIST, ROUND_INFO, @JsonEnumDefaultValue UNKNOWN;

        @JsonCreator
        public static MessageType from(String type) {
            return valueOf(type);
        }

    }
}
