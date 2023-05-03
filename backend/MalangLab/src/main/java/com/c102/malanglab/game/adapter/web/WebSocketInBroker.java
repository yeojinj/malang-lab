package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.dto.Message;
import com.c102.malanglab.game.dto.websocket.GuestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketInBroker {
    private final GameStatusCase gameStatusCase;

    @MessageMapping("room.{roomId}")
    public void messageHandler(
            @DestinationVariable Long roomId,
            StompHeaderAccessor accessor,
            Message message) {
        String userId = accessor.getSessionId();
        log.info("roomId -> {}, userId -> {}, message -> {}", roomId, userId, message);
        switch(message.getType()) {
            case JOIN:
                gameStatusCase.joinMember(roomId, userId, (Message<GuestDto>) message);
                break;
            case EXIT:
                gameStatusCase.exitMember(roomId, userId);
                break;
            default:
                break;
        }
    }
}
