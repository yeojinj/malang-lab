package com.c102.malanglab.game.dto;

import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Setting;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoomResponse {

    private Long id;
    private String name;
    private String hostId;
    private GameMode mode;
    private List<Setting> settings;
    private List<Guest> guests;

}


