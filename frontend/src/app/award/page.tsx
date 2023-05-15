'use client';

import { awardsApi } from '@/apis/apis';
import GuestAward from '@/components/award/GuestAward';
import HostAward from '@/components/award/HostAward';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const mocks = [
  {
    type: 'IDEA_MACHINE',
    guest: {
      id: '',
      nickname: '',
      imagePath: '',
      roomId: 0,
    },
  },
  {
    type: 'HIDDEN_FASTER',
    guest: {
      id: '',
      nickname: '',
      imagePath: '',
      roomId: 0,
    },
  },
  {
    type: 'LAST_FIGHTER',
    guest: {
      id: '',
      nickname: '',
      imagePath: '',
      roomId: 0,
    },
  },
  {
    type: 'QUICK_THINKER',
    guest: {
      id: '',
      nickname: '',
      imagePath: '',
      roomId: 0,
    },
  },
];

export default function Page() {
  const isHost = useSelector((state: RootState) => state.status.isHost);

  const gameinfo = useSelector((state: RootState) => state.gameinfo);
  const [awardDatas, setAwardDatas] = useState([]);

  useEffect(() => {
    // award 데이터 받아오기
    const handleAward = async () => {
      try {
        const res = await awardsApi(gameinfo.id);
        console.log(res, 'awards data');
        setAwardDatas(res);
      } catch (err) {
        console.log('Failed to fetch word cloud data', err);
      }
    };
    handleAward();
  }, [gameinfo.id]);

  return (
    <div>
      {isHost ? (
        <HostAward awardDatas={mocks} />
      ) : (
        <GuestAward awardDatas={mocks} />
      )}
    </div>
  );
}
