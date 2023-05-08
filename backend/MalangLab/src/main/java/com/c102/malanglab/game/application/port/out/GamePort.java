package com.c102.malanglab.game.application.port.out;

import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Room;
import java.io.File;

public interface GamePort {

    /** 방 만들기 */
    Room save(Room room);

    /** 게임 참가하기 */
    Room join(Long roomId);

    /** 닉네임 설정하기 */
    boolean setNickname(Long roomId, String nickname);

    /** 캐릭터 이미지 설정하기 */
    Guest setImage(Long roomId, String userId, File image);

    /** 유저 퇴장 시 삭제 */
    void removeUser(String userId);

    /** 게임 시작 시 현재 라운드 정보 조회 */
    // Round checkRound(Long roomId);

    /** 게임 중 단어 입력 (0: 중복 단어, 1: 입력 성공, 2: 히든 단어 입력 성공) */
    int inputWord(Long roomId, String userId, String word);

    Room findById(Long id);
}
