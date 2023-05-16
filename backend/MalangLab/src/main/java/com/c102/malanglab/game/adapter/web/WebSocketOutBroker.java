package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GameUniCastPort;
import com.c102.malanglab.game.dto.GuestResponse;
import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.GuestRequest;
import com.c102.malanglab.game.dto.RoundResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketOutBroker implements GameBroadCastPort, GameUniCastPort {
    private final SimpMessageSendingOperations simpMessageSendingOperations;


    @Override
    public void alertJoinMember(Long roomId, Message<GuestRequest> message) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, message);

    }

    @Override
    public void alertMoveCelebrateMember(Long roomId, Message<Object> message) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, message);
    }

    @Override
    public void alertExitMember(Long roomId, Message<GuestRequest> message) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, message);
    }

    @Override
    public void alertRoomDestory(Long roomId, Message<Object> message) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, message);
    }

    @Override
    public void alertServerTime(Long serverTime) {
        simpMessageSendingOperations.convertAndSend("/topic/serverTime", serverTime);
    }

    @Override
    public void start(Long roomId, Message<RoundResponse> data) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, data);
    }

    @Override
    public void alertGuestList(String userId, Message<List<GuestResponse>> message) {
        log.info("===== alertGuestList()");
        simpMessageSendingOperations.convertAndSend("/queue/" + userId, message);
    }

    @Override
    public void alertRoomManager(String roomId, Object message) {
        simpMessageSendingOperations.convertAndSend("/queue/manager.room." + roomId, message);
    }
}
