'use client';

import Confetti from '@/components/award/Confetti';
import GuestAward from '@/components/award/GuestAward';
import Ribbon from '@/components/award/Ribbon';
import AlertBox from '@/components/common/AlertBox';
import Blur from '@/components/common/Blur';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  // const isHost = useSelector((state: RootState) => state.status.isHost);
  const isHost = true;
  const award = true;

  return (
    <div>
      <div
        className={`w-[100vw] h-[100vh] bg-bg-2 bg-cover bg-center flex justify-center align-middle items-center relative ${
          isHost ? '-z-10' : ''
        }`}
      >
        {!isHost && !award && (
          <>
            <Blur />
            <AlertBox text={'수상자 발표! 화면을 확인하세요'} />
          </>
        )}
        {isHost ? (
          <>
            <Confetti />
            <div>
              <p className="text-black font-bold text-[2rem]">
                히든 단어를 가장 먼저 맞춘 말랑이!
              </p>
              <Image
                src={'/imgs/cat.png'}
                width={500}
                height={500}
                alt="award"
                className="h-[400px] w-[300px] relative left-24 mt-10 mb-32"
              />
              <Ribbon />
            </div>
          </>
        ) : (
          <>
            {award && (
              <>
                <Confetti />
                <GuestAward />
              </>
            )}
          </>
        )}
      </div>
      {isHost && (
        <Link href={`/award/${Number(params.slug) + 1}`}>
          <Image
            src={'/imgs/awardbtn.png'}
            width={100}
            height={100}
            alt="btn"
            className="w-16 h-20 absolute bottom-[50%] right-5 cursor-pointer"
          />
        </Link>
      )}
    </div>
  );
}
