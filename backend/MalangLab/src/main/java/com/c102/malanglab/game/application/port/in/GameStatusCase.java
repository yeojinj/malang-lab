package com.c102.malanglab.game.application.port.in;

import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.dto.Message;

import com.c102.malanglab.game.dto.RoomRequest;
import com.c102.malanglab.game.dto.RoomResponse;

public interface GameStatusCase {

    /**
     * 게임 방을 생성합니다
     * @param request
     * @Param userId
     */
    RoomResponse create(RoomRequest request, String userId);

    /**
     * 게임 방 정보를 가져옵니다.
     * @param roomId
     */
    RoomResponse get(final Long roomId);

    /**
     * 게스트는 닉네임과 사진을 등록합니다
     */





    /**
     * 호스트는 게임을 시작합니다.
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
