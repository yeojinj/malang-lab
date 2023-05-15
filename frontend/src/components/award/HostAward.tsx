'use cleint';

import Image from 'next/image';
import HostAwardItem from '@/components/award/HostAwardItem';
import { AwardInfo } from '@/store/Types';
import { useState } from 'react';

type Props = {
  awardDatas: AwardInfo[];
};

export default function HostAward({ awardDatas }: Props) {
  const [order, setOrder] = useState(0);
  const handleClick = () => {
    if (order < 3) {
      setOrder(order + 1);
    }
  };
  return (
    <>
      <HostAwardItem awardInfo={awardDatas[order]} />
      {order}
      <button onClick={handleClick}>
        <Image
          src={'/imgs/awardbtn.png'}
          width={100}
          height={100}
          alt="btn"
          className="w-16 h-20 absolute bottom-[50%] right-5 cursor-pointer"
        />
      </button>
    </>
  );
}
