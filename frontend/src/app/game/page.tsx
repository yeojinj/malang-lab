'use client';

import 'animate.css';
import { useEffect, useState } from 'react';
import Blur from '@/components/common/Blur';
import CountDown from '@/components/game/CountDown';
import GameUserNum from '@/components/game/GameUserNum';
import WordNum from '@/components/game/WordNum';
import Image from 'next/image';
import WordList from '@/components/game/WordList';
import Timer from '@/components/game/Timer';
import AlertBox from '@/components/common/AlertBox';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function GamePage() {
  const [countShow, setCountShow] = useState(false);
  const [finish, setFinish] = useState(false);
  const isHost = useSelector((state: RootState) => state.status.isHost);
  const time = 60;
  const keyword = '말랑이';
  const word = 'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/word.png'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCountShow(false);
    }, 3200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`min-h-screen bg-cover flex flex-col align-middle bg-bg-1 whitespace-pre-wrap ${
        isHost ? 'justify-center' : ''
      } ${finish ? 'justify-center' : ''} items-center`}
    >
      {countShow && (
        <>
          <Blur />
          <CountDown />
        </>
      )}

      {isHost ? (
        <>
          <div className="flex fixed top-0 w-screen">
            <GameUserNum num={60} />
            <Timer setFinish={setFinish} time={time + 3.2} />
          </div>
          <WordNum num={1004} />
          <h1 className="absolute font-bold text-[5rem] text-[#44474B] top-72 animate__animated animate__heartBeat">
            {keyword}
          </h1>
          <Image
            src={word}
            alt="word"
            width={800}
            height={500}
          />
        </>
      ) : (
        <>
          <div className="flex sm:fixed sm:right-10 justify-center">
            <Timer setFinish={setFinish} time={time + 3.2} />
          </div>
          <h1 className="text-[#44474B] text-[3rem] font-semibold sm:mt-16">
            제시어 : {keyword}
          </h1>
          <h2 className="text-[#44474B] mx-5 my-2 font-semibold">
            떠오르는 단어를 마구마구 입력해주세요!
          </h2>
          <WordList />
        </>
      )}

      {finish && isHost && (
        <>
          <Blur />
          <AlertBox text={'1라운드 종료!'} />
          <Link href={'/result'}>
            <button className="bg-black absolute z-20 font-semibold rounded text-white px-10 py-2 bottom-48 left-[45%]">
              결과 확인하기
            </button>
          </Link>
        </>
      )}

      {finish && !isHost && (
        <>
          <Blur />
          <AlertBox text={'1라운드 종료!\n 화면을 확인하세요'} />
        </>
      )}
    </div>
  );
}
