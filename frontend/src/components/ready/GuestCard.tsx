import Image from 'next/image';
import 'animate.css';
import { ReadyInfo } from '@/store/readyInfoSlice';

type Props = {
  guest: ReadyInfo;
};

export default function GuestCard({ guest }: Props) {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg,rgba(255, 255, 255, 0.6) 0%,rgba(255, 255, 255, 0.3) 100%)',
      }}
      className="shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] p-10 flex flex-col items-center animate__animated animate__jackInTheBox"
    >
      <Image
        src={`https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/${guest.imagePath}`}
        alt="char"
        width={100}
        height={100}
        className="animate-bounce"
      />
      <h1 className="text-center mt-5 text-xl font-medium">{guest.nickname}</h1>
    </div>
  );
}
