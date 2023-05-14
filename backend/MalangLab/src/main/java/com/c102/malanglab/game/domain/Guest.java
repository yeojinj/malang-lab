package com.c102.malanglab.game.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.ZSetOperations;

@Entity
@Getter
@Table(name = "guest")
@ToString
@EqualsAndHashCode(of = "id")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Guest {

    @Id
    @Column(name = "GUEST_ID")
    private String id;

    @Column(name = "NICKNAME")
    private String nickname;

    @Column(name = "IMAGE_PATH")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID", updatable = false)
    @ToString.Exclude
    private Room room;

    public Guest(String id, String nickname, String url) {
        this.id = id;
        this.nickname = nickname;
        this.imagePath = url;
    }

    public void setRoom(Room room) {
        this.room = room;
        if(!room.getGuests().contains(this)) {
            room.getGuests().add(this);
        }
    }

    public static Guest convertToGuest(ZSetOperations.TypedTuple typedTuple) {
        Guest guestDomain = new Guest();
        guestDomain.id = typedTuple.getValue().toString();
        return guestDomain;
    }
}
