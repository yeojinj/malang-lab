package com.c102.malanglab.game.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Getter
@Table(name = "guest")
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Guest {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "GUEST_ID")
    private String id;

    @Column(name = "NICKNAME")
    private String nickname;

    @Column(name = "IMAGE_PATH")
    private String imagePath;

    public Guest(String id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
