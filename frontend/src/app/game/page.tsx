'use client';

import { useEffect, useState } from 'react';
import Blur from '@/components/common/Blur';
import CountDown from '@/components/game/CountDown';
import GameUserNum from '@/components/game/GameUserNum';
import WordNum from '@/components/game/WordNum';
import Image from 'next/image';
import WordList from '@/components/game/WordList';
import Timer from '@/components/game/Timer';
import AlertBox from '@/components/common/AlertBox';

export default function GamePage() {
  const [show, setShow] = useState(false);
  const [finish, setFinish] = useState(true);
  const isHost = true;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`min-h-screen bg-cover flex flex-col align-middle ${
        isHost ? 'justify-center' : ''
      } ${finish ? 'justify-center' : ''} items-center`}
      style={{ backgroundImage: "url('/imgs/bg-1.png')" }}
    >
      {finish ? (
        <>
          <Blur />
          {/* <CountDown /> */}
          <AlertBox text={'1라운드 종료!'} />
        </>
      ) : isHost ? (
        <>
          <div className="flex">
            <GameUserNum num={60} />
            {/* <Timer /> */}
          </div>
          <WordNum num={1004} />
          <h1 className="absolute font-bold text-[7rem] text-[#44474B]">
            말랑이
          </h1>
          <Image src={'/imgs/word.png'} alt="word" width={800} height={500} />
        </>
      ) : (
        <>
          {/* <Timer /> */}
          <h1 className="text-[#44474B] text-[3rem] font-semibold mt-16">
            제시어: 말랑이
          </h1>
          <h2 className="text-[#44474B] m-2">
            제시어를 보고 떠오르는 단어를 마구마구 입력해주세요!
          </h2>
          <WordList />
        </>
      )}
    </div>
  );
}
