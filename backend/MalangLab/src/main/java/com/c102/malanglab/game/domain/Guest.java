package com.c102.malanglab.game.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Getter
@Table(name = "guest")
@ToString
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
    @JoinColumn(name = "ROOM_ID", insertable = false, updatable = false)
    private Room room;

    public Guest(String userId, String nickname, String imgPath, Room room) {
        this.id = userId;
        this.nickname = nickname;
        this.imagePath = imgPath;
        this.setRoom(room);
    }

    // room - guest 연관관계 편의 메소드
    public void setRoom(Room room) {
        if (this.room != null) {
            this.room.getGuests().remove(this);
        }
        this.room = room;
        room.getGuests().add(this);
    }
}
