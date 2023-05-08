'use client';

import GuestsList from '@/components/ready/GuestsList';
import PinCode from '@/components/ready/EnterCode';
import StartBtn from '@/components/ready/StartBtn';
import UserNum from '@/components/ready/UserNum';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ReadyPage() {
  // const isHost = useSelector((state: RootState) => state.status.isHost);
  const isHost = false;

  return (
    <>
      {isHost ? (
        <div
          className="min-h-screen bg-cover flex flex-col align-middle bg-bg-1"
        >
          <PinCode code={990107} />
          <div className="text-center text-[#44474B]">
            <h1 className="text-[2rem] font-bold">말랑이의 연구소</h1>
            <h2 className="my-5">
              준비가 완료되면 시작하기 버튼을 눌러주세요!
            </h2>
            <div>
              <StartBtn />
              <UserNum num={6} />
            </div>
          </div>
          <GuestsList host={isHost} />
        </div>
      ) : (
        <div
          className="min-h-screen bg-cover flex flex-col align-middle pt-10 bg-repeat-y bg-bg-1"
        >
          <div className="text-center text-black">
            <h1 className="text-[2rem] font-bold">말랑이의 연구소</h1>
            <h2 className="my-5">당신의 닉네임이 있는지 확인해보세요! </h2>
            <UserNum num={6} />
            <GuestsList host={isHost} />
          </div>
        </div>
      )}
    </>
  );
}
