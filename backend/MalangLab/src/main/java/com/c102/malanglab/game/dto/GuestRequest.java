package com.c102.malanglab.game.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuestRequest {
    private String id;
    @Size(min = 1, max = 12)
    private String nickname;

    @NotNull
    private MultipartFile image;

    public static GuestRequest of(String id) {
        return new GuestRequest(id, null, null);
    }
}
