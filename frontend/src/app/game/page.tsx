'use client';

import 'animate.css';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// apis
import { useSocket } from '@/context/SocketContext';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { setTotalAction, wordZeroAction } from '@/store/wordNumSlice';
import { RoundInfo } from '@/store/roundInfoSlice';
import { GameInfo } from '@/store/gameInfoSlice';
// Components
import Blur from '@/components/common/Blur';
import CountDown from '@/components/game/CountDown';
import GameUserNum from '@/components/game/GameUserNum';
import WordNum from '@/components/game/WordNum';
import WordList from '@/components/game/WordList';
import Timer from '@/components/game/Timer';
import AlertBox from '@/components/common/AlertBox';
import BgAudioPlayer from '@/components/common/BgAudioPlayer';


export default function GamePage() {
  const word =
  'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/word.png';
  const router = useRouter();
  const dispatch = useDispatch();
  const { publishUpdate } = useSocket();
  const [countShow, setCountShow] = useState(true);
  const audio = new Audio('/audio/end.mp3');

  // redux에서 가져올 값
  const num: number = useSelector((state: RootState) => state.wordNum.num);
  const roundInfo: RoundInfo = useSelector((state: RootState) => state.roundInfo);
  const gameInfo: GameInfo = useSelector((state: RootState) => state.gameinfo);
  const userNum: number = useSelector((state: RootState) => state.readyInfo).length;
  const isHost: boolean = useSelector((state: RootState) => state.status.isHost);


  // 다음 라운드에 카운트다운 다시 켜기
  useEffect(() => {
    setCountShow(true) 
    const timeout = setTimeout(() => {
      setCountShow(false);
    }, 3200);
    return () => clearTimeout(timeout);
  }, [roundInfo.keyword]);

  const handleClick = async () => {
    dispatch(setTotalAction(num));
    dispatch(wordZeroAction());``
    router.push('/result');
  };

  // publish 라운드 종료 메시지
  const handleFinish = () => {
    const destination = `/topic/room.${gameInfo.id}`;
    const type = 'ROUND_FINISH';
    publishUpdate(destination, type);
  };

  // 라운드 종료 시 심벌즈 효과음 재생
  useEffect(() => {
    if(roundInfo?.finish && isHost) audio?.play();
  }, [roundInfo?.finish]);

  return (
    <div
      className={`min-h-screen bg-cover flex flex-col align-middle bg-bg-1 whitespace-pre-wrap ${isHost ? 'justify-center' : ''
        } ${roundInfo.finish ? 'justify-center' : ''} items-center`}
    >
      {/* 카운트다운 */}
      {countShow && (
        <>
          <Blur />
          <CountDown />
        </>
      )}

      {/* 카운트다운 끝 & Host */}
      {!countShow && isHost && (
        <>
          <BgAudioPlayer src="/audio/gamefull.wav" />
          <div className="flex fixed top-0 w-screen mr-10">
            <GameUserNum num={userNum} />
            <Timer onFinish={handleFinish} time={roundInfo.timeLimit} />
          </div>
          <WordNum num={num} />
          <div className="absolute font-bold text-[4rem] text-[#44474B] top-72 animate__animated animate__heartBeat">
            {roundInfo.keyword}
          </div>
          <Image src={word} alt="word" width={800} height={500} />
        </>
      )}

      {/* 카운트다운 끝 & Guest */}
      {!countShow && !isHost && (
        <>
        <div className='pulsate'>
          <div className="text-[#44474B] text-[3rem] font-semibold mt-10 sm:mt-16">
            제시어 : {roundInfo.keyword}
          </div>
          <div className="text-[#44474B] mx-5 my-2 font-semibold">
            떠오르는 단어를 마구마구 입력해주세요!
          </div>
        </div>
          <WordList />
        </>
      )}

      {/* 게임 끝 & Host */}
      {roundInfo.finish && isHost && (
        <>
        <div className='invisible'>
        </div>
          <Blur />
          <AlertBox text={`${roundInfo.round}라운드 종료!`} />
          <button
            className="bg-black absolute z-20 mx-auto font-semibold rounded text-white px-10 py-2 bottom-48"
            onClick={handleClick}
          >
            결과 확인하기
          </button>
        </>
      )}

      {/* 게임 끝 & Guest */}
      {roundInfo.finish && !isHost && (
        <>
          <Blur />
          <AlertBox
            text={`${roundInfo.round}라운드 종료!\n 화면을 확인하세요`}
          />
        </>
      )}
    </div>
  );
}
