package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.game.application.port.in.GameStatusCase;
import com.c102.malanglab.game.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketInBroker {
    private final GameStatusCase gameStatusCase;

    @MessageMapping("/room/{roomId}")
    public void messageHandler(@DestinationVariable Long roomId, Message message) {
        switch(message.getType()) {
            case JOIN:
                gameStatusCase.join(roomId, message.getClientId());
                break;
            case EXIT:
                break;
            default:
                break;
        }
    }
}
