package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.application.port.out.GamePort;
import com.c102.malanglab.game.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameAdapter implements GamePort {
    private final RoomRepository roomRepository;

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }
    @Override
    public Room findById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("요청한 ID의 게임이 존재하지 않습니다."));
    }
}
