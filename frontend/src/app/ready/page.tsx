'use client';

import GuestsList from '@/components/ready/GuestsList';
import PinCode from '@/components/ready/EnterCode';
import StartBtn from '@/components/ready/StartBtn';
import UserNum from '@/components/ready/UserNum';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BgAudioPlayer from '@/components/common/BgAudioPlayer';

export default function ReadyPage() {
  const router = useRouter();
  const isHost = useSelector((state: RootState) => state.status.isHost);
  const title = useSelector((state: RootState) => state.gameinfo.name);
  const readyInfo = useSelector((state: RootState) => state.readyInfo);
  const roundInfo = useSelector((state: RootState) => state.roundInfo);
  const guestTitle = useSelector((state: RootState) => state.guest.title);

  useEffect(() => {
    if (roundInfo.keyword) {
      router.push('/game');
    }
  }, [roundInfo]);

  return (
    <>
      <BgAudioPlayer src="/audio/bgfull.wav" />
      {isHost ? (
        <div className="min-h-screen bg-cover flex flex-col align-middle bg-bg-1">
          <PinCode />
          <div className="text-center text-[#44474B]">
            <h1 className="text-[2rem] font-bold">{title}</h1>
            <h2 className="my-5">
              준비가 완료되면 시작하기 버튼을 눌러주세요!
            </h2>
            <div>
              <StartBtn category={'게임 시작'} />
              <UserNum num={readyInfo.length} />
            </div>
          </div>
          <GuestsList host={isHost} />
        </div>
      ) : (
        <div className="min-h-screen bg-cover flex flex-col align-middle pt-10 bg-repeat-y bg-bg-1">
          <div className="text-center text-black">
            <h1 className="text-[2rem] font-bold">{guestTitle}</h1>
            <h2 className="my-5">당신의 닉네임이 있는지 확인해보세요! </h2>
            <UserNum num={readyInfo.length} />
            <GuestsList host={isHost} />
          </div>
        </div>
      )}
    </>
  );
}
