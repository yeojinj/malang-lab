import Confetti from '@/components/award/Confetti';
import GuestAwardItem from '@/components/award/GuestAwardItem';
import Blur from '@/components/common/Blur';
import AlertBox from '@/components/common/AlertBox';
import { AwardInfo } from '@/store/Types';

type Props = {
  awardDatas: AwardInfo[];
};

export default function GuestAward({ awardDatas }: Props) {
  // 내가 받은 award
  const token = localStorage.getItem('token');
  const myAward = awardDatas.filter(item => {
    item.guest.id === token;
  });
  return (
    <>
      {myAward.length === 0 ? (
        <>
          <Blur />
          <AlertBox text={'수상자 발표!\n 화면을 확인하세요'} />
        </>
      ) : (
        <>
          <Confetti />
          {myAward.map((item, idx) => {
            <GuestAwardItem awardInfo={item} key={idx} />;
          })}
        </>
      )}
    </>
  );
}
