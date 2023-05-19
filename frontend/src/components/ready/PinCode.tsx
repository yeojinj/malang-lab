'use client';

import Image from 'next/image';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function PinCode() {
  const code: number = useSelector((state: RootState) => state.gameinfo.id);

  return (
    <div className="flex mt-3 mb-10 justify-center mx-auto">
        <div
          style={{
            background:
              'linear-gradient(180deg,rgba(255, 255, 255, 0.5) -0.19%,rgba(255, 255, 255, 0.25) 99.81%)',
          }}
          className="pulsate h-[130px] shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] mr-5"
        >
          <div className="flex">
            <Image
              className="mx-5 my-3"
              src={
                `https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/octo-malang.png`
              }
              alt="character"
              width={120}
              height={120}
            />
            <h1 className="text-[5rem] text-[#44474B] font-bold mr-10">
              {code}
            </h1>
          </div>
        </div>
    </div>
  );
}
