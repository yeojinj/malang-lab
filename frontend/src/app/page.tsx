'use client';

import GameModeItem from '@/components/main/GameModeItem';
import React, { useEffect, useState } from 'react';
import { getTokenApi } from '@/apis/apis';
import BgAudioPlayer from '@/components/common/BgAudioPlayer';
import { useSocket } from '@/context/SocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { stringToArray } from 'konva/types/shapes/Text';

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

  useEffect(() => {
    console.log('first enter');
    const newToken = getTokenApi();
    setToken(newToken);
  }, []);

  useEffect(() => {
    console.log(token, 'new token');
    makeClient('wss://api.malang-lab.com/ws');
  }, [token]);


  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/imgs/bg-2.png')" }}
    >
      {/* <BgAudioPlayer src='/audio/bgfull.wav'/> */}
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
