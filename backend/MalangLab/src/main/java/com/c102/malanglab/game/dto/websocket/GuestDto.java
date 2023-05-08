package com.c102.malanglab.game.dto.websocket;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuestDto {
    private String id;
    private String nickname;
    private String imagePath;

    public static GuestDto of(String id) {
        return new GuestDto(id, null, null);
    }
}
