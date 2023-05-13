package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.domain.*;

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
        // 방 정보 MariaDB 저장
        Room newRoom = roomRepository.save(room);

        // 방 정보 Redis 저장
        String key = "room:" + roomId + ":info";
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        hashOperations.put(key, "name", room.getName());
        hashOperations.put(key, "mode", String.valueOf(room.getMode()));
        hashOperations.put(key, "total-round", String.valueOf(room.getTotalRound()));
        for (int round = 0; round < room.getTotalRound(); round++) {
            // 라운드 정보 Redis 저장
            String roundKey = key + ":" + (round + 1);
            hashOperations.put(roundKey, "keyword", room.getSettings().get(round).getKeyword());
            hashOperations.put(roundKey, "hidden", room.getSettings().get(round).getHidden());
            hashOperations.put(roundKey, "time", String.valueOf(room.getSettings().get(round).getTime()));
        }
        String statusKey = "room:" + roomId + ":status";
        hashOperations.put(statusKey, "start", "0");
        hashOperations.put(statusKey, "turn", "0");
        hashOperations.put(statusKey, "enter-num", "0");

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
        Boolean isIdValid = boundSetOperations.isMember(roomId);
        if (isIdValid) {
            key = "room:" + roomId + ":status";
            HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
            // 2. 입장 가능한 방인지(게임 시작하지 않았는지) 체크
            String isStart = String.valueOf(hashOperations.get(key, "start"));
            if ("0".equals(isStart)) {
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
        // Redis 중복 검사 및 저장
        String key = "room:" + roomId + ":nickname";
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        Boolean isExist = (setOperations.add(key, nickname) == 0);
        if (!isExist) {
            return true;
        } else {
            return false;
        }
    }

    /** 캐릭터 이미지 설정하기 */
    @Override
    public Guest addGuest(Guest guest) {
        // MariaDB 저장
        guestRepository.save(guest);
        return guest;
    }

    @Override
    public void removeRoom(Long roomId) {
        // TODO: 방 제거
    }

    /** 유저 퇴장 시 삭제 */
    @Override
    public void removeUser(Long roomId, String userId) {
        // 1. Redis 삭제
        //  1-1. Set에서 삭제
        String key = "room:" + roomId + ":nickname";
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        setOperations.remove(key, userId);
        //  1-2. Sorted Set에서 삭제
        key = "room:" + roomId + ":guests";
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        zSetOperations.remove(key, userId);
        //  1-3. 유저가 대기실에 있는지 게임 중인지 검증 -> 게임 중이었을 경우 시상에서 제외
        key = "room:" + roomId + ":status";
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        String isStart = String.valueOf(hashOperations.get(key, "start"));
        if ("1".equals(isStart)) {
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
        // 1. Sorted Set으로 참여자 순서를 기록합니다.
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        long current = hashOperations.increment("room:" + roomId + ":status", "enter-num", 1);

        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();

        zSetOperations.add("room:" + roomId + ":guests", userId, current);
    }

    /** 게임 참가자 정보 조회하기 */
    @Override
    public List<Guest> getGuestList(Long roomId) {
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<Object>> tuples = zSetOperations.rangeWithScores("room:" + roomId + ":guests", 0, -1);

        // 1. tuples로부터 참가자 이름을 순서대로 가져온다.
        List<String> userIds = tuples.stream().map(t -> (String) t.getValue()).collect(Collectors.toList());
        // 2. mysql로 유저 목록을 일괄 조회환다.
        List<Guest> list = guestRepository.getUserList(userIds);

        return list;
    }

    @Override
    public boolean isGameManager(Long roomId, String userId) {
        String hostId = findById(roomId).getHostId();
        return userId.equals(hostId);
    }

    @Override
    public Round checkRound(Long roomId) {
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        int currentTurn = hashOperations.increment("room:" + roomId + ":status", "turn", 1).intValue();
        int totalTurn = Integer.valueOf(hashOperations.get("room:" + roomId + ":info", "total-round"));
        boolean isGameStart = Integer.valueOf(hashOperations.get("room:" + roomId + ":status", "start")) > 0;
        boolean isLast = false;
        if(!isGameStart) {
            hashOperations.put("room:" + roomId + ":status", "start", "1");
        } else if(currentTurn == totalTurn) {
            isLast = true;
        }

        return Round.builder()
            .setting(
                new Setting(
                    String.valueOf(hashOperations.get("room:" + roomId + ":info:" + currentTurn, "keyword")),
                    String.valueOf(hashOperations.get("room:" + roomId + ":info:" + currentTurn, "hidden")),
                    Integer.valueOf(hashOperations.get("room:" + roomId + ":info:" + currentTurn, "time")),
                    currentTurn
                )
            )
            .isLast(isLast)
            .build();
    }

    /** 게임 중 단어 입력 (0: 중복 단어, 1: 입력 성공, 2: 히든 단어 입력 성공) */
    @Override
    public int inputWord(Long roomId, String userId, String word, Long time) {
        // 1. 현재 턴 수 조회
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":status";
        String turn = (String) hashOperations.get(key, "turn");

        // 2. 중복 단어인지 체크
        // 해당 방에서 해당 사용자가 라운드마다 입력한 단어 Set에 검사와 동시에 add
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        key = "room:" + roomId + ":" + userId + ":" + turn + ":word";
        Boolean isWordExist = (setOperations.add(key, word) == 0);
        if (isWordExist) {
            return 0;
        }

        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        // 3. 히든 단어 체크
        boolean isHidden = false;
        key = "room:" + roomId + ":info:" + turn;
        String hiddenWord = (String) hashOperations.get(key, "hidden");
        if (hiddenWord.equals(word)) {
            isHidden = true;
            // 해당 방에서 라운드마다 히든 단어 찾은 사람, 찾은 시간 Sorted Set add
            key = "room:" + roomId + ":" + turn + ":hidden:user-time";
            zSetOperations.add(key, userId, time);
        }

        // 4. Redis 저장
        // 해당 방에서 해당 사용자가 라운드마다 입력한 단어, 입력한 시간 Sorted Set add
        key = "room:" + roomId + ":" + userId + ":" + turn + ":word-time";
        zSetOperations.add(key, word, time);

        // 해당 방에서 라운드마다 입력된 단어, 가중치 Sorted Set add
        key = "room:" + roomId + ":" + turn + ":word-cnt";
        zSetOperations.incrementScore(key, word, 1);

        // 해당 방에서 해당 라운드에 해당 단어마다 입력한 사람, 시간 Sorted Set add
        key = "room:" + roomId + ":" + turn + ":" + word + ":user-time";
        zSetOperations.add(key, userId, time);

        // 해당 방에서 사용자마다 입력한 단어 수 Sorted Set add
        key = "room:" + roomId + ":user-word-cnt";
        zSetOperations.incrementScore(key, userId, 1);

        if(isHidden) return 2;
        else return 1;
    }

    @Override
    public Long totalWordCount(Long roomId) {
        // 1. 현재 턴 수 조회
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":status";
        String turn = (String) hashOperations.get(key, "turn");

        // 2. 총 단어 수 조회 및 반환
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        key = "room:" + roomId + ":" + turn + ":word-cnt";
        Long totalWordCount = zSetOperations.size(key);
        return totalWordCount;
    }

    @Override
    public Room findById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 게임이 존재하지 않습니다."));
    }

    @Override
    public Guest getGuest(String id) {
        return guestRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 참가자가 존재하지 않습니다."));
    }

    @Override
    public Object totalWordResult(Long roomId) {
        // TODO: 만들어 주세요!
        return null;
    }

    @Override
    public Guest getWinner(Long roomId, AwardType type) {
        switch(type) {
            case IDEA_MACHINE -> getWinner1(roomId);
            case LAST_FIGHTER -> getWinner2(roomId);
            case HIDDEN_FASTER -> getWinner3(roomId);
            case QUICK_THINKER -> getWinner4(roomId);
        }
        return null;
    };

    /**
     * 단어를 가장 많이 입력한 말랑이
     * @param roomId
     * @return
     */
    private Guest getWinner1(Long roomId) {
        return null;
    }

    /**
     * 히든 단어를 가장 빨리 찾은 말랑이
     * @param roomId
     * @return
     */
    private Guest getWinner2(Long roomId) {
        return null;
    }

    /**
     * 맨 마지막까지 최선을 다한 말랑이
     * @param roomId
     * @return
     */
    private Guest getWinner3(Long roomId) {
        return null;
    }

    /**
     * 빈도수 가장 높은 단어 먼저 쓴 말랑이
     * @param roomId
     * @return
     */
    private Guest getWinner4(Long roomId) {
        return null;
    }
}