'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
// Components
import Lock from '../common/Lock';
// types
import { Mode } from '@/app/page';

type Props = {
  mode: Mode;
};

export default function GameModeItem({ mode }: Props) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  // const audio = new Audio('/audio/hover.mp3')
  
  // 버튼위에 마우스가 올라가 있을 때만 실행
  const handleMouseEnter = (() => {
    audio.play()
  })

  useEffect(() => {
    setAudio(new Audio('/audio/hover.mp3'));
  }, [])

  return (
    <Link
      href={`/${mode.path}`}
      onMouseEnter={handleMouseEnter}
      className={`relative bg-white w-[95%] m-auto my-2 rounded-[10px] flex flex-col justify-center align-middle py-5 sm:py-10 ${mode.path === '' ? '' : 'hover:scale-[1.02]'
        }`}
    >
        <img
          src={`https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/${mode.image}.png`}
          alt=""
          className="w-[50%] sm:w-[90%] mx-auto mt-2 mb-4"
        />
        {mode.name === '혼자하기' && <Lock />}
        <p className="text-center text-2xl my-2 font-bold">{mode.name}</p>
    </Link>
  );
}
