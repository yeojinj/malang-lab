package com.c102.malanglab.game.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserOutRequest {
    @NotBlank
    private String token;
}
