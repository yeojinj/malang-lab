'use cleint';

import Image from 'next/image';
import HostAwardItem from '@/components/award/HostAwardItem';
import { AwardInfo } from '@/store/Types';
import { useState } from 'react';
import AlertBox from '../common/AlertBox';
import Blur from '../common/Blur';

type Props = {
  awardDatas: AwardInfo[];
};

export default function HostAward({ awardDatas }: Props) {
  const [order, setOrder] = useState<number>(0);
  const handleClick = () => {
    if (order < 3) {
      setOrder(order + 1);
    }
  };

  return (
    <>
      {order === 3 && (
        <>
          <Blur />
          <AlertBox text={'bye'} />
        </>
      )}
      <HostAwardItem awardInfo={awardDatas[order]} />
      <Image
        src={
          'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/awardbtn.png'
        }
        width={100}
        height={100}
        alt="btn"
        className="w-16 h-20 absolute bottom-[50%] right-5 cursor-pointer"
        onClick={handleClick}
      />
    </>
  );
}
