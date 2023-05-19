package com.c102.malanglab.game.adapter.persistence;

import com.c102.malanglab.game.domain.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, String> {

    @Query("SELECT g FROM Guest g WHERE g.id IN :userIds") //  ORDER BY FIELD(g.id, :userIds)
    List<Guest> getUserList(List<String> userIds);
}
