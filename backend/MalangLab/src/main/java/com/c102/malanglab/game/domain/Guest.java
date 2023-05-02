package com.c102.malanglab.game.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Getter
@Table(name = "guests")
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

}
