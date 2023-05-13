package com.c102.malanglab.game.application.port.out;

import com.c102.malanglab.game.domain.AwardType;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.domain.Round;

import java.util.List;

public interface GamePort {

    /** 방 만들기 */
    Room save(Room room);

    /** 게임 참가 */
    Room join(Long roomId);

    /** 닉네임 설정 */
    boolean setNickname(Long roomId, String userId, String nickname);

    /** 캐릭터 이미지 설정 */
    Guest addGuest(Guest guest);

    /** 방 제거 */
    void removeRoom(Long roomId);
    /** 유저 퇴장 시 삭제 */
    void removeUser(Long roomId, String userId);

    /** 게임 참가자 정보 저장 */
    void addGuestList(Long roomId, String userId);

    /** 게임 참가자 정보 조회 */
    List<Guest> getGuestList(Long roomId);

    /** 게임 호스트인지 체크 */
    boolean isGameManager(Long roomId, String userId);

    /** 게임 시작 시 현재 라운드 정보 조회 */
    Round checkRound(Long roomId);

    /** 게임 중 단어 입력 (0: 중복 단어, 1: 입력 성공, 2: 히든 단어 입력 성공) */
    int inputWord(Long roomId, String userId, String word, Long time);

    /** 현재 라운드에 입력된 총 단어 수 */
    Long totalWordCount(Long roomId);

    Room findById(Long id);

    /** guest 정보 조회 */
    Guest getGuest(String id);

    /** 현재 라운드에 입력된 총 단어 결과 **/
    Object totalWordResult(Long roomId);

    /** 단어를 가장 많이 입력한 말랑이 */
    /** 히든 단어를 가장 빨리 찾은 말랑이 *
    /** 맨 마지막까지 최선을 다한 말랑이 */
    /** 빈도수 가장 높은 단어 먼저 쓴 말랑이 */
    Guest getWinner(Long roomId, AwardType type);
}
