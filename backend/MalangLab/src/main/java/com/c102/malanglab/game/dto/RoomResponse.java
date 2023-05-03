package com.c102.malanglab.game.dto;

import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Setting;
import java.util.List;

public record RoomResponse (Long id, String name, String hostId, GameMode mode, List<Setting> settings, List<Guest> guests) {

}


