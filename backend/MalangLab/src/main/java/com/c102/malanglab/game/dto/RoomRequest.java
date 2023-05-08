package com.c102.malanglab.game.dto;

import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Setting;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
public class RoomRequest {
        private String name;
        private GameMode mode;
        List<Setting> settings;

}
