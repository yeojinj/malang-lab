package com.c102.malanglab.game.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WordRequest {

    @NotNull
    @Size(min=1, max=10)
    private String word;

    @NotNull
    private Long time;
}
