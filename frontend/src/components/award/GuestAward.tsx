'use client';

import Confetti from '@/components/award/Confetti';
import GuestAwardItem from '@/components/award/GuestAwardItem';
import Blur from '@/components/common/Blur';
import AlertBox from '@/components/common/AlertBox';
import { AwardInfo } from '@/store/Types';
import useToken from '@/hooks/useToken';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Props = {
  awardDatas: AwardInfo[];
};

export default function GuestAward({ awardDatas }: Props) {
  // 내가 받은 award
  const nickname = useSelector((state: RootState) => state.guest.nickname);
  const myAward = awardDatas?.filter(item => {
    return item.guest.nickname === nickname;
  });
  console.log(myAward, 'myAward');
  return (
    <>
      {myAward?.length === 0 ? (
        <>
          <Blur />
          <AlertBox text={'수상자 발표!\n 화면을 확인하세요'} />
        </>
      ) : (
        <>
          <Confetti />
          {myAward?.map((item, idx) => {
            return <GuestAwardItem awardInfo={item} key={idx} />;
          })}
        </>
      )}
    </>
  );
}
