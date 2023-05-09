package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Guest;
import com.c102.malanglab.game.domain.Room;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameAdapter implements GamePort {
    private final RoomRepository roomRepository;

    private final GuestRepository guestRepository;

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
        hashOperations.put(key, "mode", String.valueOf(room.getMode()));
        hashOperations.put(key, "total-round", String.valueOf(room.getTotalRound()));
        for (int round = 0; round < room.getTotalRound(); round++) {
            String roundKey = key + ":" + (round + 1);
            hashOperations.put(roundKey, "keyword", room.getSettings().get(round).getKeyword());
            hashOperations.put(roundKey, "hidden", room.getSettings().get(round).getHidden());
            hashOperations.put(roundKey, "time", String.valueOf(room.getSettings().get(round).getTime()));
        }
        String statusKey = "room:" + roomId + ":status";
        hashOperations.put(statusKey, "start", "0");
        hashOperations.put(statusKey, "turn", "0");
        hashOperations.put(statusKey, "enter-num", "0");

        // 방 정보 MariaDB 저장
        Room newRoom = roomRepository.save(room);
        return newRoom;
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
    public Room join(Long roomId) {
        // 1. PIN 유효한지 체크
        String key = "room:id";
        BoundSetOperations<String, Object> boundSetOperations = redisTemplate.boundSetOps(key);
        if (boundSetOperations.isMember(roomId)) {
            key = "room:" + roomId + ":status";
            HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
            // 2. 입장 가능한 방인지(게임 시작하지 않았는지) 체크
            if ("0".equals(hashOperations.get(key, "start"))) {
                // 3. 해당 방 정보 조회
                key = "room:" + roomId + ":info";
                String name = (String) hashOperations.get(key, "name");
                String hostId = (String) hashOperations.get(key, "host-id");
                GameMode mode = GameMode.from((String) hashOperations.get(key, "mode"));
                int totalRound = Integer.valueOf((String) hashOperations.get(key, "total-round"));
                Room room = new Room(roomId, name, hostId, mode, totalRound, null, null);
                return room;
            } else {
                throw new IllegalStateException("이미 시작한 방입니다.");
            }
        } else {
            throw new IllegalStateException("존재하지 않는 방입니다.");
        }
    }


    /** 닉네임 설정하기 */
    @Override
    public boolean setNickname(Long roomId, String userId, String nickname) {
        // 1. Redis 중복 검사 및 저장
        String key = "room:" + roomId + ":nickname";
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        if (setOperations.add(key, nickname) == 1) {
            // 2. MariaDB 저장
            guestRepository.save(new Guest(userId, nickname));
            return true;
        } else {
            return false;
        }
    }

    /** 캐릭터 이미지 설정하기 */
    @Override
    @Transactional
    public Guest setImage(Long roomId, String userId, String imgPath) {
        // MariaDB 저장
        Guest guest = findById(userId);
        guest.setImagePath(imgPath);
        return guest;
    }

    /** 유저 퇴장 시 삭제 */
    @Override
    public void removeUser(Long roomId, String userId) {
        // 1. Redis 삭제
        //  1-1. Set에서 삭제
        String key = "room:" + roomId + ":nickname";
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        setOperations.remove(key, userId);
        //  1-2. TODO: Sorted Set에서 삭제

        //  1-3. 유저가 대기실에 있는지 게임 중인지 검증 -> 게임 중이었을 경우 시상에서 제외
        key = "room:" + roomId + ":status";
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        if ("1".equals(hashOperations.get(key, "start"))) {
            key = "room:" + roomId + ":exit";
            ListOperations<String, String> listOperations = redisTemplate.opsForList();
            listOperations.rightPush(key, userId);
        }
        // 2. MariaDB 삭제
        //  2-1. guest 테이블에서 유저 삭제
        guestRepository.deleteById(userId);
    }

    /** 게임 참가자 정보 저장하기 */
    @Override
    public void addGuestList(Long roomId, String userId) {
        // 1.sortedSet으로 참여자 순서를 기록합니다.
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        long current = hashOperations.increment("room:" + roomId + ":status", "enter-num", 1);

        ZSetOperations<String, Object> zSet = redisTemplate.opsForZSet();

        zSet.add("room:" + roomId + ":guests", userId, current);
    }

    /** 게임 참가자 정보 조회하기 */
    @Override
    public List<Guest> getGuestList(Long roomId) {
        ZSetOperations<String, Object> zSet = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<Object>> tuples = zSet.rangeWithScores("room:" + roomId + ":guests", 0, -1);

        // 1. tuples로부터 참가자 이름을 순서대로 가져온다.
        List<String> userIds = tuples.stream().map(t -> (String) t.getValue()).collect(Collectors.toList());
        // 2. mysql로 유저 목록을 일괄 조회환다.
        List<Guest> list = guestRepository.getUserList(userIds);

        return list;
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

    @Override
    public Guest findById(String id) {
        return guestRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 참가자가 존재하지 않습니다."));
    }
}