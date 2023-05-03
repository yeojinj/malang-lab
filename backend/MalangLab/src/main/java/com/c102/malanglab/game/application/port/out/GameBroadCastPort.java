package com.c102.malanglab.game.application.port.out;

public interface GameBroadCastPort {
    void alertJoin(Long roomId, String userId);

    void alertServerTime(Long serverTime);
}
