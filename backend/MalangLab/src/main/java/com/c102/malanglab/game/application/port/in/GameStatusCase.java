package com.c102.malanglab.game.application.port.in;

import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.CreateRequest;
import com.c102.malanglab.game.dto.Message;

public interface GameStatusCase {
    Room get(final Long roomId);

    Room create(CreateRequest request, String userId);

    /**
     * 게임을 시작합니다.
     * @param roomId
     * @param userId
     */
    void start(final Long roomId, final String userId);


    /**
     * 참가자가 게임에 입장합니다.
     * @param roomId
     * @param userId
     */
    void joinMember(final Long roomId, final String userId, Message message);

    /**
     * 참가자가 게임에 퇴장합니다.
     * @param roomId
     * @param userId
     */
    void exitMember(final Long roomId, final String userId);
}
