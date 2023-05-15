package com.c102.malanglab.game.dto;

import com.c102.malanglab.game.domain.Guest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HiddenResponse {
    String word;
    List<Guest> guests;
}
