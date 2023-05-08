package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import com.c102.malanglab.game.application.port.out.GameUniCastPort;
import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.websocket.GuestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.TimeZone;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketOutBroker implements GameBroadCastPort, GameUniCastPort {
    private final SimpMessageSendingOperations simpMessageSendingOperations;


    @Override
    public void alertJoinMember(Long roomId, Message<GuestDto> message) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, message);

    }

    @Override
    public void alertExitMember(Long roomId, Message<GuestDto> message) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, message);
    }

    @Override
    public void alertServerTime(Long serverTime) {
        simpMessageSendingOperations.convertAndSend("/topic/serverTime", serverTime);
    }

    @Override
    public void start(Long roomId, Object data) {
        simpMessageSendingOperations.convertAndSend("/topic/room." + roomId, data);
    }

    @Override
    public void alertGuestList(String userId, Message<List<GuestDto>> message) {
        simpMessageSendingOperations.convertAndSend("/queue/" + userId, message);
    }
}
