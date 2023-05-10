'use client';

import Image from 'next/image';
import WordsGrid from './WordsGrid';
import { useRef, useState, useEffect } from 'react';

export default function WordList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLAudioElement>(null);
  const [word, setWord] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    // 가장 밑으로 스크롤
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // 효과음
    playerRef.current?.play();
  }, [words]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (word.trim() === '') {
        alert('단어를 입력해주세요.');
      } else if (words.includes(word)) {
        alert('중복된 단어입니다!');
        setWord('')
      } else if (word.length > 13) {
        alert('13자 이내로 입력해주세요.')
        setWord(word.slice(0,13))
      }
      else {
        setWords([...words, word]);
        setWord('');
      }
    }
  };

  return (
    <div className="mt-3 sm:mt-10 w-screen flex flex-col items-center ">
      <audio ref={playerRef} src={'/audio/wordeffect.mp3'} />
      <div
        className="w-[80vw] h-[50vh] sm:h-[40vh] overflow-y-auto scrollbar-hide mb-8"
        ref={scrollRef}
      >
        <WordsGrid words={words} />
      </div>

      <div className="relative">
        <input
          className="shadow-[20px_20px_100px_2px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] w-[90vw] md:w-[30vw] h-[60px] text-2xl focus:outline-none py-10 pl-10 pr-24 sm:my-12"
          style={{ background: 'rgba(245, 138, 240, 0.18)' }}
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Image
          src={
            'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/octo-malang.png'
          }
          alt=""
          width={50}
          height={50}
          className="absolute bottom-5 sm:bottom-16 right-[20px] animate-bounce"
        />
      </div>
    </div>
  );
}
