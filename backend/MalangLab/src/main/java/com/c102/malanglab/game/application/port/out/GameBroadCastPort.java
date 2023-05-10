package com.c102.malanglab.game.application.port.out;

import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.GuestRequest;

public interface GameBroadCastPort {
    void alertJoinMember(Long roomId, Message<GuestRequest> message);
    void alertExitMember(Long roomId, Message<GuestRequest> message);
    void alertServerTime(Long serverTime);
    void start(Long roomId, Object Data);
}
