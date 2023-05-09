'use client';

import Confetti from '@/components/award/Confetti';
import GuestAward from '@/components/award/GuestAward';
import HostAward from '@/components/award/HostAward';
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

const awardData = [
  {
    hostText: "단어를 가장 많이 입력한 말랑이!",
    imgPath: "cat",
    guestText: "많랑이",
  },
  {
    hostText: "히든 단어를 가장 빨리 찾은 말랑이!",
    imgPath: "cat",
    guestText: "빨랑이",
  },
  {
    hostText: "맨 마지막까지 최선을 다한 말랑이!",
    imgPath: "cat",
    guestText: "승부살랑이",
  },
  {
    hostText: "입력을 가장 적게한 말랑이!",
    imgPath: "cat",
    guestText: "아메발랑이",
  },
  {
    hostText: "가장 많이 나온 단어를 먼저 쓴 말랑이!",
    imgPath: "cat",
    guestText: "텔레랑이",
  }
]

export default function Page({ params }: Props) {
  // const isHost = useSelector((state: RootState) => state.status.isHost);
  const isHost = true;
  const award = true;

  return (
    <div className='whitespace-pre-wrap'>
      <div
        className={`w-[100vw] h-[100vh] bg-bg-2 bg-cover bg-center flex justify-center align-middle items-center relative ${
          isHost ? '-z-10' : ''
        }`}
      >
        {!isHost && !award && (
          <>
            <Blur />
            <AlertBox text={'수상자 발표!\n 화면을 확인하세요'} />
          </>
        )}
        {isHost ? (
          <>
            <Confetti />
            <HostAward text={'히든 단어를 가장 먼저 맞춘 말랑이!'} imgPath={'cat'} />
          </>
        ) : (
          <>
            {award && (
              <>
                <Confetti />
                <GuestAward text={'많랑이'}/>
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
