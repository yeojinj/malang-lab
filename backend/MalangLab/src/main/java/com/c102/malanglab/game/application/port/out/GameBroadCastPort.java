package com.c102.malanglab.game.application.port.out;

import com.c102.malanglab.game.dto.GuestResponse;
import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.GuestRequest;
import com.c102.malanglab.game.dto.RoundResponse;

import java.util.List;

public interface GameBroadCastPort {
    void alertJoinMember(Long roomId, Message<GuestRequest> message);
    void alertMoveCelebrateMember(Long roomId, Message<Object> message);
    void alertGoodBye(Long roomId, Message<Object> message);
    void alertExitMember(Long roomId, Message<GuestRequest> message);
    void alertRoomDestory(Long roomId, Message<Object> message);
    void alertServerTime(Long serverTime);
    void start(Long roomId, Message<RoundResponse> Data);
}
