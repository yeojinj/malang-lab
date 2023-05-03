package com.c102.malanglab.game.dto;

import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Setting;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public record RoomRequest(String name, GameMode mode, List<Setting> settings) {
    public RoomRequest {
        if(Objects.isNull(settings)) settings = new ArrayList<>();
    }
}
