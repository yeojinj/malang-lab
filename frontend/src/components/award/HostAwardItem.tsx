import Image from 'next/image';
import Ribbon from './Ribbon';
import Confetti from './Confetti';
import { AwardInfo } from '@/store/Types';
import { award } from '@/data/awarddata';

type Props = {
  awardInfo: AwardInfo;
};

export default function HostAwardItem({ awardInfo }: Props) {
  
  return (
    <div>
      <Confetti />
      <p className="text-black font-bold text-[2rem] mt-8">
        {award[awardInfo?.type]?.title}
      </p>
      <Image
        src={award[awardInfo?.type]?.imagePath}
        width={500}
        height={500}
        alt="award"
        className="h-[400px] w-[300px] relative left-24 mt-10 mb-32"
      />
      <Ribbon nickname={awardInfo?.guest.nickname} />
    </div>
  );
}
