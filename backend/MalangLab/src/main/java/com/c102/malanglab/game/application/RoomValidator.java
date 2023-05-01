package com.c102.malanglab.game.application;

import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Room;
import com.c102.malanglab.game.domain.Setting;

import java.util.List;
import java.util.Objects;

public class RoomValidator {
    public static void validate(Room room) {
        if(room.getMode() == GameMode.UNKOWN) {
            throw new IllegalStateException("룸의 게임상태가 설정되지 않았습니다.");
        }

        if(room.getSettings().isEmpty()) {
            throw new IllegalStateException("룸의 게임세팅이 비어있습니다.");
        }

        for(Setting setting : room.getSettings()) {
            validateSetting(setting);
        }
    }

    public static void validateSetting(Setting setting) {
        if(Objects.isNull(setting.getKeyword()) || setting.getKeyword().isEmpty() || setting.getKeyword().isBlank()) {
            throw new IllegalStateException("게임세팅에서 키워드가 비어있습니다.");
        }
        if(Objects.isNull(setting.getHidden()) || setting.getHidden().isEmpty() || setting.getHidden().isBlank()) {
            throw new IllegalStateException("게임세팅에서 히든단어가 비어있습니다.");
        }
        if(Objects.isNull(setting.getTime()) || setting.getTime() < 0 || setting.getTime() > 300) {
            throw new IllegalStateException("게임세팅에서 타이머를 5분 이내로 설정해주세요.");
        }
    }
}
