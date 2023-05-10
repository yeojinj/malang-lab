package com.c102.malanglab.game.application.port.out;

import com.c102.malanglab.game.dto.GuestResponse;
import com.c102.malanglab.game.dto.Message;

import java.util.List;

public interface GameUniCastPort {
    void alertGuestList(String userId, Message<List<GuestResponse>> message);

    void alertRoomManager(String roomId, Object Message);
}
