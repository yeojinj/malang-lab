package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

}
