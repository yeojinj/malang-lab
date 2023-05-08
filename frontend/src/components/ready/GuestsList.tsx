'use client';

import GuestGrid from './GuestGrid';
import { useRef, useState, useEffect } from 'react';

const guests = [
  {
    name: '냠냠이',
    image: '/imgs/character.png',
  },
  {
    name: '문어지지마',
    image: '/imgs/character.png',
  },
  {
    name: '지냠이',
    image: '/imgs/character.png',
  },
  {
    name: '냠냠이',
    image: '/imgs/character.png',
  },
  {
    name: '문어지지마',
    image: '/imgs/character.png',
  },
  {
    name: '지냠이',
    image: '/imgs/character.png',
  },
];

type Props = {
  host: boolean;
};

export default function GuestsList({ host }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, []);

  return (
    <div
      className={`w-screen h-[70vh] ${
        host ? 'sm:h-[32vh]' : 'sm:h-[67vh]'
      } my-5 overflow-y-auto scrollbar-hide`}
      ref={scrollRef}
    >
      <GuestGrid guests={guests} />
    </div>
  );
}
