package com.c102.malanglab.game.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Entity
@ToString
@Table(name = "settings")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Setting {
        @Id
        @GeneratedValue(generator = "uuid")
        @GenericGenerator(name = "uuid", strategy = "uuid")
        @Column(name = "SETTING_ID")
        private String id;

        @Column(name = "KEYWORD")
        private String keyword;

        @Column(name = "HIDDEN_WORD")
        private String hidden;

        @Column(name = "TIME_LIMIT")
        private Integer time;

        @Column(name = "ROUND")
        private Integer round;

        public Setting(String keyword, String hidden, Integer time, Integer round) {
                this.keyword = keyword;
                this.hidden = hidden;
                this.time = time;
                this.round = round;
        }

}
