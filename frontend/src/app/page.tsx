'use client';

import GameModeItem from '@/components/main/GameModeItem';
import React, { useEffect, useState } from 'react';
import { getTokenApi } from '@/apis/apis';
import { useSocket } from '@/context/SocketContext';

export interface Mode {
  name: string;
  image: string;
  path: string;
}

const modes = [
  { name: '방 만들기', image: '', path: 'create' },
  { name: '참여하기', image: '', path: 'join' },
  { name: '혼자하기', image: '', path: '' },
];

export default function MainPage() {
  const [token, setToken] = useState(null);
  const { makeClient } = useSocket();

  // 메인 페이지 입장 시 토큰 생성
  useEffect(() => {
    console.log('first enter');
    const newToken = getTokenApi();
    setToken(newToken);
  }, []);

  // 토큰이 생성되면 웹소켓 연결
  useEffect(() => {
    console.log(token, 'new token');
    makeClient('wss://api.malang-lab.com/ws');
  }, [token]);


  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center bg-bg-2"
    >
      <div className="w-[80vw] sm:w-[60vw] flex justify-center items-center m-auto glass py-5 my-10 sm:my-0 sm:py-10">
        <div className="w-[96%] h-[60%] flex flex-col">
          <p className="text-center text-3xl sm:text-4xl font-semibold">
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
