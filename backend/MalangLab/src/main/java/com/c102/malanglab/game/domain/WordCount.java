package com.c102.malanglab.game.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;

@Data
@NoArgsConstructor
public class WordCount {
    String word;
    int count;

    public static WordCount convertToWordCount(ZSetOperations.TypedTuple typedTuple) {
        WordCount wordCountDomain = new WordCount();
        wordCountDomain.word = typedTuple.getValue().toString();
        wordCountDomain.count = typedTuple.getScore().intValue();
        return wordCountDomain;
    }
}
