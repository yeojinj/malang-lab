package com.c102.malanglab.game.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuestResponse {
    private String id;
    private String nickname;
    private String imagePath;
    private Long roomId;

    public static GuestResponse of(String id) {
        return new GuestResponse(id, null, null, null);
    }
}
