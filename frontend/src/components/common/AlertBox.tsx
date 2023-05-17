'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  text: string;
};

export default function AlertBox({ text }: Props) {
  const tulip =
    'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/tulip-malang.png';
  const mini =
    'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/mini-together.png';
  const bye =
    'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/bye.png';

  const router = useRouter();
  const [audio, setAudio] = useState<HTMLAudioElement>();

  // 버튼위에 마우스가 올라가 있을 때만 실행
  const handleMouseEnter = () => {
    audio?.play();
  };

  // 홈으로 돌아가기
  const handleClickGoHome = () => {
    router.push('/')
  }

  return (
    <>
      {text === 'bye' ? (
        <div
          style={{
            background:
              'linear-gradient(180deg,rgba(255, 255, 255, 0.5) -0.19%,rgba(255, 255, 255, 0.25) 99.81%)',
          }}
          className="w-screen h-screen shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] fixed top-0 left-0 z-10"
        >
          <div className="flex flex-col gap-20 item-center justify-center fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 z-20">
            <div className="bg-white shadow-[7px_7px_10px_rgba(0,0,0,0.25)] relative rounded-[10px] w-[90vw] sm:w-[50vw]">
              <Image
                src={bye}
                width={200}
                height={100}
                alt="bye"
                className="absolute bottom-[-50px] left-[-100px] animate-[wiggle_1s_ease-in-out_infinite]"
              />
              <h1 className="font-bold text-[#44474B] text-[2rem] py-7 text-center sm:text-[3rem]">
                다음에 만나요~
              </h1>
            </div>
            <button onClick={handleClickGoHome} onMouseEnter={handleMouseEnter} className="button-black w-[50%] sm:w-[40%] h-12 mx-auto rounded-[5px] text-lg hover:scale-105 z-20">
              홈으로
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-[7px_7px_10px_rgba(0,0,0,0.25)] rounded-[10px] absolute w-[90vw] sm:w-[50vw] z-20">
          <Image
            src={tulip}
            width={100}
            height={50}
            alt="tulip"
            className="absolute top-[-35px] left-[-20px]"
          />
          <Image
            src={mini}
            width={100}
            height={50}
            alt="mini"
            className="absolute bottom-[-25px] right-[-15px]"
          />
          <h1 className="font-bold text-[#44474B] text-[2rem] py-7 text-center sm:text-[3rem]">
            {text}
          </h1>
        </div>
      )}
    </>
  );
}
