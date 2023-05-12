'use client';

import { gameStartApi } from '@/apis/apis';
import { useSocket } from '@/context/SocketContext';
import { updatePresentAction } from '@/store/gameInfoSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function StartBtn({ category }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const gameinfo = useSelector((state: RootState) => state.gameinfo);
  const { publish } = useSocket();

  const handleClick = async () => {
    if (gameinfo.present == gameinfo.settings.length) {
      router.push('/award');
    } else {
      // 게임 시작 API
      const res = await gameStartApi(gameinfo.id);
      // 해당 라운드 정보
      const sendinfo = gameinfo.settings[gameinfo.present];
      dispatch(updatePresentAction());
      // publish 라운드 정보
      if (res) {
        const destination = `/topic/room.${gameinfo.id}`;
        const type = 'ROUND_START';
        const message = {
          keyword: sendinfo.keyword,
          timeLimit: sendinfo.time,
          round: sendinfo.round,
          isLast: sendinfo.round == gameinfo.settings.length,
        };
        console.log(message, 'rounde message!!');
        publish(destination, type, message);
        setTimeout(() => {
          router.push('/game');
        }, 1000);
      }
    }
  };

  return (
    <button
      className="bg-[#44474B] rounded text-white px-5 py-2"
      onClick={handleClick}
    >
      <p className="text-white font-semibold">
        {gameinfo.present == gameinfo.settings.length
          ? '수상 확인하기'
          : category}
      </p>
    </button>
  );
}
