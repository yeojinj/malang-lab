package com.c102.malanglab.game.application.port.out;

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

    /** 유저 퇴장 시 삭제 */
    void removeUser(Long roomId, String userId);

    /** 게임 참가자 정보 저장 */
    void addGuestList(Long roomId, String userId);

    /** 게임 참가자 정보 조회 */
    List<Guest> getGuestList(Long roomId);

    /** 게임 호스트인지 체크 */
    boolean isGameManager(Long roomId, String userId);

    /** 방 PIN 번호로 방 정보 조회 */
    Room findById(Long id);

    /** 게임 시작 시 현재 라운드 정보 조회 */
    Round checkRound(Long roomId);

    /** 게임 중 단어 입력 (0: 중복 단어, 1: 입력 성공, 2: 히든 단어 입력 성공) */
    int inputWord(Long roomId, String userId, String word, Long time);

    /** 현재 라운드에 입력된 총 단어 수 */
    Long totalWordCount(Long roomId);

    /** 현재 라운드 결과 - 워드클라우드 */
    Object getRoundResultCloud(Long roomId);

    /** 현재 라운드 결과 - 히든단어 */

    /** 현재 라운드 결과 - 특별한 아이디어 */
}
