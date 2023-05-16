package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.domain.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameAdapter implements GamePort {
    private final RoomRepository roomRepository;

    private final GuestRepository guestRepository;

    private final RedisTemplate redisTemplate;

    /** 방 만들기
     *  MariaDB, Redis에 방 정보 저장 */
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

    /** 게임 참가 */
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

    /** 닉네임 설정 */
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

    /** 캐릭터 이미지 설정 */
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

    /** 게임 참가자 정보 저장 */
    @Override
    public void addGuestList(Long roomId, String userId) {
        // 1. Sorted Set으로 참여자 순서를 기록합니다.
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        long current = hashOperations.increment("room:" + roomId + ":status", "enter-num", 1);

        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();

        zSetOperations.add("room:" + roomId + ":guests", userId, current);
    }

    /** 게임 참가자 정보 조회 */
    @Override
    public List<Guest> getGuestList(Long roomId) {
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<Object>> typedTuples = zSetOperations.rangeWithScores("room:" + roomId + ":guests", 0, -1);
        if(!Objects.isNull(typedTuples) && !typedTuples.isEmpty()) {
            // 1. tuples로부터 참가자 이름을 순서대로 가져온다.
            List<String> userIds = typedTuples.stream()
                    .map(tuple -> String.valueOf(tuple.getValue()))
                    .filter(d -> !Objects.isNull(d))
                    .collect(Collectors.toList());

            if(userIds.isEmpty()) { // 참가자 이름목록이 비어있다면 빈 리스트를 리턴한다.
                return List.of();
            }

            // 2. mysql로 유저 목록을 일괄 조회환다.
            List<Guest> list = guestRepository.getUserList(userIds);

            return list;
        }

        return List.of();
    }

    /** 게임 호스트인지 체크 */
    @Override
    public boolean isGameManager(Long roomId, String userId) {
        String hostId = findById(roomId).getHostId();
        return userId.equals(hostId);
    }

    /** 방 PIN 번호로 방 정보 조회 */
    @Override
    public Room findById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 게임이 존재하지 않습니다."));
    }

    /** 게임 시작 시 현재 라운드 정보 조회 */
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

    /** 게임 중 단어 입력
     *  @return 0: 중복 단어, 1: 입력 성공, 2: 히든 단어 입력 성공 */
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

    /** 현재 라운드에 입력된 총 단어 수 */
    @Override
    public Long totalWordCount(Long roomId) {
        // 1. 현재 턴 수 조회
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":status";
        String turn = hashOperations.get(key, "turn");

        // 2. 총 단어 수 조회 및 반환
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        key = "room:" + roomId + ":" + turn + ":word-cnt";
        Long totalWordCount = zSetOperations.size(key);
        return totalWordCount;
    }

    /** 현재 라운드 결과 - 워드클라우드 */
    @Override
    public List<WordCount> getRoundResultCloud(Long roomId) {
        // 1. 현재 턴 수 조회
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":status";
        String turn = hashOperations.get(key, "turn");

        // 2. 해당 턴에 입력된 단어와 가중치 List 조회
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        key = "room:" + roomId + ":" + turn + ":word-cnt";
        Set<ZSetOperations.TypedTuple<Object>> typedTuples = zSetOperations.rangeWithScores(key, 0, -1);

        List<WordCount> result = new ArrayList<>();
        if(!Objects.isNull(typedTuples) && !typedTuples.isEmpty()) {
            result = typedTuples.stream()
                    .map(WordCount::convertToWordCount)
                    .collect(Collectors.toList());
        }
        return result;
    }

    /** 현재 라운드 결과 - 히든단어 */
    @Override
    public String getRoundResultHiddenWord(Long roomId) {
        // 1. 현재 턴 수 조회
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":status";
        String turn = hashOperations.get(key, "turn");

        // 2. 히든단어 조회
        key = "room:" + roomId + ":info:" + turn;
        String hiddenWord = hashOperations.get(key, "hidden");

        return hiddenWord;
    }

    /** 현재 라운드 결과 - 히든단어 찾은 사람들 */
    @Override
    public List<Guest> getRoundResultHiddenFound(Long roomId) {
        // 1. 현재 턴 수 조회
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":status";
        String turn = hashOperations.get(key, "turn");

        // 2. 히든단어 찾은 사람들 아이디 조회
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        key = "room:" + roomId + ":" + turn + ":hidden:user-time";
        Set<ZSetOperations.TypedTuple<Object>> typedTuples = zSetOperations.rangeWithScores(key, 0, -1);
        List<Guest> result = new ArrayList<>();
        if(!Objects.isNull(typedTuples) && !typedTuples.isEmpty()) {
            result = getGuestList(typedTuples);
        }

        return result;
    }

    /**
     * 히든 정보 조회 tuple에서 유저ID로 DB에 있는 유저 리스트를 반환합니다.
     * @param typedTuples
     * @return
     */
    private List<Guest> getGuestList(Set<ZSetOperations.TypedTuple<Object>> typedTuples) {
        return typedTuples.stream()
                .map(tuple -> String.valueOf(tuple.getValue()))
                .map(id -> guestRepository.findById(id).orElseGet(null)) // 3. 히든단어 찾은 사람들 정보 조회
                .filter(d -> !Objects.isNull(d))
                .collect(Collectors.toList());
    }

    /** 현재 라운드 결과 - 특별한 아이디어 */

    /** 참가자 ID로 참가자 정보 조회 */
    @Override
    public Guest getGuest(String id) {
        return guestRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 참가자가 존재하지 않습니다."));
    }

    @Override
    public Guest getWinner(Long roomId, AwardType type) {
        switch(type) {
            case IDEA_MACHINE -> {
                return getIdeaMachine(roomId);
            }
            case LAST_FIGHTER -> {
                return getLastFighter(roomId);
            }
            case HIDDEN_FASTER -> {
                return getHiddenFaster(roomId);
            }
            case QUICK_THINKER -> {
                return getQuickThinker(roomId);
            }
        }
        return null;
    }

    /**
     * 단어를 가장 많이 입력한 말랑이
     * @param roomId
     * @return
     */
    private Guest getIdeaMachine(Long roomId) {
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        String key = "room:" + roomId + ":user-word-cnt";
        long size = zSetOperations.zCard(key);
        Guest guest = null;
        for (long i = 0; i < size; i++) {
            Set<TypedTuple<Object>> resultSet = zSetOperations.reverseRangeWithScores(key, i, i);
            for (TypedTuple<Object> tuple : resultSet) {
                Object value = tuple.getValue();
                guest = getGuest((String) value);
            }
            if (guest != null) break;   // 퇴장한 유저인지 체크
        }
        return guest;
    }

    /**
     * 맨 마지막까지 최선을 다한 말랑이
     * @param roomId
     * @return
     */
    private Guest getLastFighter(Long roomId) {
        // 1. 전체 턴 수
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":info";
        int totalRound = Integer.parseInt((String) hashOperations.get(key, "total-round"));

        // 2. 모든 라운드 통틀어서 맨 마지막에 단어를 입력한 사람 찾기
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        long minRemainTime = Long.MAX_VALUE;    // 라운드 종료까지 남은 시간 중 최솟값
        String minGuestId = "";                 // 해당 기록을 낸 참가자 아이디
        for (int roundNum = 1; roundNum <= totalRound; roundNum++) {     // 각 라운드마다
            key = "room:" + roomId + ":info:" + roundNum;
            int roundTime = Integer.parseInt((String) hashOperations.get(key, "time"));  // 라운드 제한시간

            // 3. 해당 라운드에 참가한 사람 리스트 가져오기
            key = "room:" + roomId + ":guests";
            Set<ZSetOperations.TypedTuple<Object>> typedTuples = zSetOperations.rangeWithScores(key, 0, -1);
            List<Guest> guests = new ArrayList<>();
            if(!Objects.isNull(typedTuples) && !typedTuples.isEmpty()) {
                guests = getGuestList(typedTuples);
            }

            // 4. 모든 게스트가 각자 해당 라운드에 가장 마지막 단어를 입력했을 때 라운드 종료까지 남은 시간을
            //    그 라운드에 다른 사람의 기록과 비교해서 최솟값(roundMinRemainTime)과 그 사람(userId) 저장하기
            long roundMinRemainTime = Long.MAX_VALUE;
            String roundMinGuestId = "";
            for (Guest guest : guests) {
                String userId = guest.getId();
                if (guestRepository.existsById(userId)) {     // 퇴장한 유저 제외
                    key = "room:" + roomId + ":" + userId + ":" + roundNum + ":word-time";
                    Set<TypedTuple<Object>> resultSet = zSetOperations.reverseRangeWithScores(key, 0, 0);
                    for (TypedTuple<Object> tuple : resultSet) {
                        Double inputTime = tuple.getScore();
                        long remainTime = (long) (roundTime * 1000 - inputTime);    // 가장 마지막 단어를 입력했을 때 라운드 종료까지 남은 시간 계산법
                        if (roundMinRemainTime > remainTime) {
                            roundMinRemainTime = remainTime;
                            roundMinGuestId = userId;
                        }
                    }
                }
            }

            if (minRemainTime > roundMinRemainTime) {   // 해당 라운드의 기록이 역대 기록보다 좋으면
                minRemainTime = roundMinRemainTime;
                minGuestId = roundMinGuestId;
            }

        }

        return guestRepository.findById(minGuestId).orElseThrow(() -> new IllegalArgumentException("수상자가 존재하지 않습니다."));
    }

    /**
     * 히든 단어를 가장 빨리 찾은 말랑이
     * @param roomId
     * @return
     */
    private Guest getHiddenFaster(Long roomId) {
        // 1. 전체 턴 수
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        String key = "room:" + roomId + ":info";
        int totalRound = Integer.parseInt((String) hashOperations.get(key, "total-round"));

        // 2. 모든 라운드 통틀어서 히든 단어를 가장 먼저 찾은 사람 찾기
        ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
        long minTime = Long.MAX_VALUE;    // 히든 단어를 찾은 시간 중 최솟값
        String minGuestId = "";                 // 해당 기록을 낸 참가자 아이디
        for (int roundNum = 1; roundNum <= totalRound; roundNum++) {    // 각 라운드마다
            // 해당 라운드에서 히든 단어를 가장 빨리 찾은 사람과 시간 가져와서 비교
            key = "room:" + roomId + ":" + roundNum + ":hidden:user-time";
            long size = zSetOperations.zCard(key);
            for (long i = 0; i < size; i++) {
                Set<ZSetOperations.TypedTuple<Object>> typedTuples = zSetOperations.rangeWithScores(key, i, i);
                for (TypedTuple<Object> tuple : typedTuples) {
                    String value = (String) tuple.getValue();
                    long score = Double.valueOf(tuple.getScore()).longValue();
                    if (guestRepository.existsById(value)) {   // 퇴장한 유저 제외
                        if (minTime > score) {
                            minTime = score;
                            minGuestId = value;
                        }
                    }
                }
            }
        }

        return guestRepository.findById(minGuestId).orElseThrow(() -> new IllegalArgumentException("수상자가 존재하지 않습니다."));
    }

    /**
     * 빈도수 가장 높은 단어 먼저 쓴 말랑이
     * @param roomId
     * @return
     */
    private Guest getQuickThinker(Long roomId) {
        return null;
    }
}