'use client';

import StartBtn from '@/components/ready/StartBtn';
import ResultCard from '@/components/result/ResultCard';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const cards = [
  {
    pathName: 'wordcloud',
    title: '워드 클라우드',
    description: '단어들을 한눈에!',
  },
  {
    pathName: 'hiddenword',
    title: '히든 단어',
    description: '히든 단어를 알아볼까요?',
  },
  {
    pathName: 'creativeword',
    title: '특별한 아이디어',
    description: '자주 언급되지 않은 단어!',
  },
];

export default function ResultPage() {
  const num: number = useSelector((state: RootState) => state.wordNum.num);
  const [audio] = useState(typeof Audio !== "undefined" && new Audio('/audio/hover.mp3'));

  const handleMouseEnter = () => {
    audio?.play();
  }

  return (
    <div className="w-screen h-screen bg-cover bg-bg-3 flex flex-col justify-center items-center gap-16 lg:gap-32">
      <header className="text-4xl font-bold">
        총 {num}개의 단어를 생각했어요!
      </header>
      <nav className="flex flex-col lg:flex-row justify-center items-center gap-10">
        {cards.map(card => (
          <>
            <div onMouseEnter={handleMouseEnter}>
              <ResultCard key={card.title} card={card} />
            </div>
          </>
        ))}
      </nav>
      <StartBtn category={'다음 라운드 시작'} />
    </div>
  );
}
