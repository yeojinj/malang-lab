package com.c102.malanglab.game.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuestRequest {
    private String id;
    private String nickname;
    private MultipartFile image;

    public static GuestRequest of(String id) {
        return new GuestRequest(id, null, null);
    }
}
