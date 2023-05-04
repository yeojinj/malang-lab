package com.c102.malanglab.game.application.port.in;

import com.c102.malanglab.game.dto.RoomRequest;
import com.c102.malanglab.game.dto.RoomResponse;

public interface GameStatusCase {
    RoomResponse get(final Long roomId);

    void join(final Long roomId, final String userId);

    RoomResponse create(RoomRequest request, String userId);
}
