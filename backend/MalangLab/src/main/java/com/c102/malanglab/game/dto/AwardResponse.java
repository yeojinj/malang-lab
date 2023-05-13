package com.c102.malanglab.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AwardResponse {
    private String type;
    private GuestResponse guest;
}
