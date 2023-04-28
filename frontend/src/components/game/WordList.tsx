'use client';

import Image from 'next/image';
import WordsGrid from './WordsGrid';

export default function WordList() {
  const words = [
    '냐',
    '냠',
    '이',
    '냠냠이냠냠이냠냠이냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
    '냠냠이',
  ];

  return (
    <div className="mt-10 mx-[8%] flex flex-col items-center">
      <div className="h-[40vh] overflow-y-auto scrollbar-hide">
        <WordsGrid words={words} />
      </div>
      <div className="relative">
        <input
          className="shadow-[20px_20px_100px_2px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] lg:w-[30vw] h-[60px] text-2xl focus:outline-none p-10 m-12"
          style={{ background: 'rgba(245, 138, 240, 0.18)' }}
        />
        <Image
          src={'/imgs/character.png'}
          alt="blub"
          width={50}
          height={50}
          className="absolute bottom-16 right-[70px]"
        />
      </div>
    </div>
  );
}
