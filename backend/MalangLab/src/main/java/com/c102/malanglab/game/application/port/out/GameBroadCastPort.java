package com.c102.malanglab.game.application.port.out;

import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.websocket.GuestDto;

public interface GameBroadCastPort {
    void alertJoinMember(Long roomId, Message<GuestDto> message);
    void alertExitMember(Long roomId, Message<GuestDto> message);
    void alertServerTime(Long serverTime);
    void start(Long roomId, Object Data);
}
