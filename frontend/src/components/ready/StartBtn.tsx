'use client';

import { gameStartApi } from '@/apis/apis';
import { useSocket } from '@/context/SocketContext';
import { GameInfo, updatePresentAction } from '@/store/gameInfoSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function StartBtn({ category }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { publish } = useSocket();
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const gameinfo: GameInfo = useSelector((state: RootState) => state.gameinfo);

  const handleClick = async () => {
    if (gameinfo.present == gameinfo.settings.length) {
      router.push('/award');
    } else {
      // 게임 시작 API
      const res = await gameStartApi(gameinfo.id);
      // 해당 라운드 정보
      const sendinfo = gameinfo.settings[gameinfo.present];
      dispatch(updatePresentAction());
      // publish 해당 라운드 정보
      if (res) {
        const destination = `/topic/room.${gameinfo.id}`;
        const type = 'ROUND_START';
        const message = {
          keyword: sendinfo.keyword,
          timeLimit: sendinfo.time,
          round: sendinfo.round,
          isLast: sendinfo.round == gameinfo.settings.length,
          startTime: new Date().getTime(),
        };
        publish(destination, type, message);
        router.push('/game');
      }
    }
  };

  // 버튼위에 마우스가 올라가 있을 때만 실행
  const handleMouseEnter = () => {
    audio?.play();
  };

  useEffect(() => {
    setAudio(new Audio('/audio/blop.mp3'));
  }, []);

  return (
    <button
      className="bg-[#44474B] rounded text-white px-5 py-2 hover:scale-105"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <p className="text-white font-semibold">
        {gameinfo.present == gameinfo.settings.length
          ? '수상 확인하기'
          : category}
      </p>
    </button>
  );
}
