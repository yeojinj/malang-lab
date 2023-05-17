import Image from 'next/image';
import Ribbon from './Ribbon';
import { AwardInfo } from '@/store/Types';
import { award } from '@/data/awarddata';

type Props = {
  awardInfo: AwardInfo;
};

export default function HostAwardItem({ awardInfo }: Props) {
  return (
    <>
      <p className="text-black font-bold text-[1.3rem] mt-4">
        {award[awardInfo?.type]?.title}
      </p>
      <Image
        src={award[awardInfo?.type]?.imagePath}
        width={300}
        height={300}
        alt="award"
        className="h-[200px] w-[150px]"
      />
      <div className="relative">
        <Ribbon nickname={awardInfo?.guest.nickname} />
      </div>
    </>
  );
}
