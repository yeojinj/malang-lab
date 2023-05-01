package com.c102.malanglab.game.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Entity
@ToString
@Table(name = "settings")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Setting {
        @Id
        @GeneratedValue(generator = "uuid")
        @GenericGenerator(name = "uuid", strategy = "uuid")
        @Column(name = "SETTING_ID")
        private String id;
        private String keyword;
        private String hidden;
        private Integer time;

        public Setting(String keyword, String hidden, Integer time) {
                this.keyword = keyword;
                this.hidden = hidden;
                this.time = time;
        }
}
