package com.c102.malanglab.game.application.port.in;

import com.c102.malanglab.game.domain.WordCount;
import com.c102.malanglab.game.dto.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

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
     * 게임을 삭제합니다.
     */
    void destory(final Long roomId);

    /**
     * 게스트는 닉네임과 사진을 등록합니다
     * @param roomId
     * @param guestRequest
     */
    GuestResponse register(final Long roomId, final GuestRequest guestRequest);

    /**
     * 게임 관리자임을 확인합니다.
     * @param roomId
     * @param userId
     */
    boolean isGameManager(final Long roomId, final String userId);
    /**
     * 호스트는 게임을 시작합니다.
     * @param roomId
     */
    void start(final Long roomId);
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

    /**
     * 참가자가 단어를 입력합니다.
     * @param roomId
     * @param userId
     */
    void inputWord(final Long roomId, final String userId, final WordRequest wordRequest);


    /**
     * 호스트가 단어의 수를 가져옵니다.
     * @param roomId
     * @param userId
     * @return
     */
    Long totalWordCount(final Long roomId, final String userId);

    /**
     * 라운드 입력 단어 결과를 가져옵니다.
     * TODO: 리턴 자료형 수정
     * @param roomId
     * @param userId
     * @return
     */
    List<WordCount> roundResultCloud(final Long roomId, final String userId);

    /**
     * 라운드 히든 단어 결과를 가져옵니다.
     * @param roomId
     * @param userId
     * @return
     */
    HiddenResponse roundResultHidden(final Long roomId, final String userId);
}
