package com.c102.malanglab.game.application.port.in;

import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.Message;

import com.c102.malanglab.game.dto.RoomRequest;
import com.c102.malanglab.game.dto.RoomResponse;

public interface GameStatusCase {
    RoomResponse get(final Long roomId);

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

    RoomResponse create(RoomRequest request, String userId);
}
