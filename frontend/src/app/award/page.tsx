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
import Blur from '@/components/common/Blur';
import AlertBox from '@/components/common/AlertBox';
// types
import { AwardInfo } from '@/store/Types';

export default function Page() {
  const isHost: boolean = useSelector(
    (state: RootState) => state.status.isHost,
  );
  const hostPin = useSelector((state: RootState) => state.gameinfo.id)
  const guestPin = useSelector((state: RootState) => state.guest.pin);
  const [awardDatas, setAwardDatas] = useState<AwardInfo[]>([]);
  const done = useSelector((state: RootState) => state.status.done)
  const gameinfo = useSelector((state: RootState) => state.gameinfo);
  const { publish } = useSocket();

  const handleClickBye = () => {
    if(gameinfo?.id) {
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
    <div className="w-[100vw] min-h-[100vh] bg-cover bg-center flex justify-center align-middle bg-bg-2 items-center">
      {isHost ? (
        <>
          <HostAward awardDatas={awardDatas} />
          <button className='button-black' onClick={handleClickBye} >종료하기</button>
        </>
      ) : (
        <GuestAward awardDatas={awardDatas} />
      )}
      {done && <>
        <Blur />
        <AlertBox text='bye' />
      </>}
    </div>
  );
}
