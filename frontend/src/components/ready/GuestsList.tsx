'use client';
// hooks
import { useRef, useEffect } from 'react';
// components
import GuestGrid from './GuestGrid';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ReadyInfo } from '@/store/readyInfoSlice';

type Props = {
  host: boolean;
};

export default function GuestsList({ host }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const readyInfo: ReadyInfo[] = useSelector((state: RootState) => state.readyInfo);

  // 스크롤 위치 하단 고정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [readyInfo]);

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
