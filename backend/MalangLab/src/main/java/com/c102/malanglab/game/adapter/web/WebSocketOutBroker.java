package com.c102.malanglab.game.adapter.web;

import com.c102.malanglab.game.application.port.out.GameBroadCastPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.TimeZone;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketOutBroker implements GameBroadCastPort {
    private final SimpMessageSendingOperations simpMessageSendingOperations;


    @Override
    public void alertJoin(Long roomId, String userId) {
        log.info("roomId -> {}, userId 가 입장했습니다. -> {}", roomId, userId);
        simpMessageSendingOperations.convertAndSend("/topic/room/" + roomId, String.format("%s is join", userId));
    }

    @Override
    public void alertServerTime(Long serverTime) {
        simpMessageSendingOperations.convertAndSend("/topic/serverTime", serverTime);
    }
}
