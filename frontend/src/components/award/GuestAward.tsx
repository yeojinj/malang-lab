'use client';

import Confetti from '@/components/award/Confetti';
import GuestAwardItem from '@/components/award/GuestAwardItem';
import Blur from '@/components/common/Blur';
import AlertBox from '@/components/common/AlertBox';
import { AwardInfo } from '@/store/Types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Props = {
  awardDatas: AwardInfo[];
};

export default function GuestAward({ awardDatas }: Props) {
  // 내가 받은 award
  const nickname = useSelector((state: RootState) => state.guest.nickname);
  const done = useSelector((state: RootState) => state.status.done)
  const myAward = awardDatas?.filter(item => {
    return item.guest.nickname === nickname;
  });
  
  return (
    <>
      {myAward?.length === 0 ? (
        <>
          <Blur />
          <AlertBox text={'수상자 발표!\n 화면을 확인하세요'} />
        </>
      ) : (
        <div className="grid-cols-1">
          <Confetti />
          {myAward?.map((item, idx) => {
            return <GuestAwardItem awardInfo={item} key={idx} />;
          })}
        </div>
      )}
      {done && 
        <AlertBox text='bye' />}
    </>
  );
}
