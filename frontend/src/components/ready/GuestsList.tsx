'use client';

import GuestGrid from './GuestGrid';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Props = {
  host: boolean;
};

export default function GuestsList({ host }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const readyInfo = useSelector((state: RootState) => state.readyInfo);
  console.log(readyInfo)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      className={`w-screen h-[68vh] ${
        host ? 'sm:h-[32vh]' : 'sm:h-[67vh]'
      } my-5 overflow-y-auto scrollbar-hide`}
      ref={scrollRef}
    >
      <GuestGrid guests={readyInfo} />
    </div>
  );
}
