'use client';
// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// apis
import { useSocket } from '@/context/SocketContext';
import { awardsApi } from '@/apis/apis';
// redux
import { RootState } from '@/store/store';
// components
import GuestAward from '@/components/award/GuestAward';
import HostAward from '@/components/award/HostAward';
import { HomeIcon } from '@heroicons/react/24/solid'
// types
import { AwardInfo } from '@/store/Types';
import AlertBox from '@/components/common/AlertBox';

export default function Page() {
  const isHost: boolean = useSelector(
    (state: RootState) => state.status.isHost,
  );
  const hostPin = useSelector((state: RootState) => state.gameinfo.id);
  const done = useSelector((state: RootState) => state.status.done)
  const guestPin = useSelector((state: RootState) => state.guest.pin);
  const [awardDatas, setAwardDatas] = useState<AwardInfo[]>([]);
  const gameinfo = useSelector((state: RootState) => state.gameinfo);
  const { publish } = useSocket();

  const handleClickBye = () => {
    if (gameinfo?.id) {
      const destination = `/app/room.${gameinfo.id}`;
      publish(destination, 'BYE', null)
    }
  };

  useEffect(() => {
    // award 데이터 받아오기
    const handleAward = async () => {
      if (isHost) {
        const res = await awardsApi(hostPin);
        setAwardDatas(res);
      } else {
        const res = await awardsApi(guestPin);
        setAwardDatas(res);
      }
    };
    handleAward();
  }, [hostPin, guestPin]);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-cover bg-center flex flex-col justify-center align-middle bg-bg-2 items-center">
      {isHost ? (
        <>
          <HostAward awardDatas={awardDatas} />
          <HomeIcon className='w-[70px] absolute bottom-4 right-4 text-white hover:scale-105' onClick={handleClickBye} />
        </>
      ) : (
        <GuestAward awardDatas={awardDatas} />
      )}
      {done && <AlertBox text='bye' />}
    </div>
  );
}
