package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Room;
import java.io.File;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameAdapter implements GamePort {
    private final RoomRepository roomRepository;

    private final RedisTemplate redisTemplate;

    /** MariaDB, Redis에 방 정보 저장 */
    @Override
    public Room save(Room roomInfo) {
        // PIN 번호 발급
        Long roomId = getRandomRoomId();
        // Room Entity 생성
        Room room = new Room(roomId, roomInfo.getName(), roomInfo.getHostId(), roomInfo.getMode(), roomInfo.getSettings().size(), roomInfo.getSettings(), roomInfo.getGuests());

        // 방 정보 Redis 저장
        String key = "room:" + roomId + ":info";
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        hashOperations.put(key, "name", room.getName());
        hashOperations.put(key, "mode", room.getMode());
        hashOperations.put(key, "total-round", room.getTotalRound());
        for (int round = 0; round < room.getTotalRound(); round++) {
            String roundKey = key + ":" + (round + 1);
            hashOperations.put(roundKey, "keyword", room.getSettings().get(round).getKeyword());
            hashOperations.put(roundKey, "hidden", room.getSettings().get(round).getHidden());
            hashOperations.put(roundKey, "time", room.getSettings().get(round).getTime());
        }
        String statusKey = "room:" + roomId + ":status";
        hashOperations.put(statusKey, "start", "0");
        hashOperations.put(statusKey, "turn", "0");

        // 방 정보 MariaDB 저장
        return roomRepository.save(room);
    }

    /** Room Id 랜덤 생성, 중복 체크 후 Redis 저장 */
    private long getRandomRoomId() {
        String key = "room:id";
        BoundSetOperations<String, Object> boundSetOperations = redisTemplate.boundSetOps(key);

        Long id = null;
        while (true) {
            id = ThreadLocalRandom.current().nextLong(100000, 1000000);
            Boolean success = (boundSetOperations.add(id) == 1);
            if (success) {
                break;
            }
        }

        return id;
    }

    /** 게임 참가하기 */
    @Override
    public Room join(Long pin) {
        return null;
    }

    /** 닉네임 설정하기 */
    @Override
    public boolean setNickname(String nickname) {
        return false;
    }

    /** 캐릭터 이미지 설정하기 */
    @Override
    public Guest setImage(File image) {
        return null;
    }

    /** 유저 퇴장 시 삭제 */
    @Override
    public void removeUser(String userId) {

    }

    /** 게임 중 단어 입력 (0: 중복 단어, 1: 입력 성공, 2: 히든 단어 입력 성공) */
    @Override
    public int inputWord(Long roomId, String userId, String word) {
        return 0;
    }

    @Override
    public Room findById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 게임이 존재하지 않습니다."));
    }
}