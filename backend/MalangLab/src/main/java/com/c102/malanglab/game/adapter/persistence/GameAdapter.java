package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.domain.Room;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameAdapter implements GamePort {
    private final RoomRepository roomRepository;

    private final RedisTemplate redisTemplate;

    /** MariaDB, Redis에 방 정보 저장 */
    @Override
    public Room save(Room roomInfo) {
        Long roomId = getRandomRoomId();
        Room room = new Room(roomId, roomInfo.getName(), roomInfo.getHostId(), roomInfo.getMode(), roomInfo.getSettings(), roomInfo.getGuests());
        return roomRepository.save(room);
    }

    /** Room Id 랜덤 생성, 중복 체크 후 Redis 저장 */
    private long getRandomRoomId() {
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String key = "room:id";
        Long id = ThreadLocalRandom.current().nextLong(100000, 1000000);
        while (!setOperations.isMember(key, id)) {
            id = ThreadLocalRandom.current().nextLong(100000, 1000000);
        }
        setOperations.add(key, id);
        return id;
    }

    @Override
    public Room findById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 게임이 존재하지 않습니다."));
    }
}
