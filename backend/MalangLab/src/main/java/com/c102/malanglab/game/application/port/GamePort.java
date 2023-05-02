package com.c102.malanglab.game.application.port;

import com.c102.malanglab.game.domain.Room;

public interface GamePort {
    Room save(Room room);

    Room findById(Long id);
}
