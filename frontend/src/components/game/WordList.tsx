'use client';

import Image from 'next/image';
import WordsGrid from './WordsGrid';
import { useRef, useState, useEffect } from 'react';

export default function WordList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState<string>("")
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [words]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (word.trim() !== "") {
        setWords([...words, word])
        setWord("")
      } else {
        alert("단어를 입력해주세요.");
      }
    }
  };

  return (
    <div className="mt-10 w-screen flex flex-col items-center">
      <div className="w-[80vw] h-[40vh] overflow-y-auto scrollbar-hide" ref={scrollRef}>
        <WordsGrid words={words} />
      </div>

      <div className="relative">
        <input
          className="shadow-[20px_20px_100px_2px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] w-[280px] md:w-[30vw] h-[60px] text-2xl focus:outline-none p-10 my-12"
          style={{ background: 'rgba(245, 138, 240, 0.18)' }}
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Image
          src={'/imgs/character.png'}
          alt="blub"
          width={50}
          height={50}
          className="absolute bottom-16 right-[20px]"
        />
      </div>
    </div>
  );
}
