package com.c102.malanglab.game.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;

@Data
@NoArgsConstructor
public class WordCount {
    String text;
    int value;

    public static WordCount convertToWordCount(ZSetOperations.TypedTuple typedTuple) {
        WordCount wordCountDomain = new WordCount();
        wordCountDomain.text = typedTuple.getValue().toString();
        wordCountDomain.value = typedTuple.getScore().intValue();
        return wordCountDomain;
    }
}
