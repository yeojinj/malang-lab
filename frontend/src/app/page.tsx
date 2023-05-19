'use client';

import React, { useEffect, useState } from 'react';
// Components
import GameModeItem from '@/components/main/GameModeItem';
// apis
import { useSocket } from '@/context/SocketContext';
import { getTokenApi } from '@/apis/apis';
import AlertBox from '@/components/common/AlertBox';

export interface Mode {
  name: string;
  image: string;
  path: string;
}

const modes: Mode[] = [
  { name: '방 만들기', image: 'blue-malang', path: 'create' },
  { name: '참여하기', image: 'together-malang', path: 'join' },
  { name: '혼자하기', image: 'yellow-malang', path: '' },
];

export default function MainPage() {
  const [token, setToken] = useState(null);
  const { makeClient } = useSocket();

  // 홈 화면 입장시 토큰 생성
  useEffect(() => {
    const handleToken = async () => {
      try {
        const newToken = await getTokenApi();
        setToken(newToken);
      } catch {}
    };
    handleToken();
  }, []);

  // 토큰이 있는 사용자는 웹소켓 연결
  useEffect(() => {
    if(token){
      makeClient('wss://api.malang-lab.com/ws');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center bg-bg-2">
     <div className="w-[80vw] sm:w-[60vw] flex justify-center items-center m-auto glass py-5 my-10 sm:my-0 sm:py-10">
        <div className="w-[96%] h-[60%] flex flex-col">
          <p className="text-center text-3xl sm:text-4xl font-semibold pulsate">
            말랑연구소
          </p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 mx-auto my-10">
            {modes.map(mode => (
              <GameModeItem key={mode.path} mode={mode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
