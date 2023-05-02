package com.c102.malanglab.game.application.port.in;

import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;

public interface GameStatusCase {
    Room get(final Long roomId);

    void join(final Long roomId, final String userId);

    Room create(CreateRequest request, String userId);
}
