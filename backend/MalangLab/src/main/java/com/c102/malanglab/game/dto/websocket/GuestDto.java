package com.c102.malanglab.game.dto.websocket;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuestDto {
    private String id;
    private String nickname;
    private MultipartFile image;

    public static GuestDto of(String id) {
        return new GuestDto(id, null, null);
    }
}
