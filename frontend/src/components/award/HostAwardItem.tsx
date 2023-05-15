import Image from 'next/image';
import Ribbon from './Ribbon';
import Confetti from './Confetti';
import { AwardInfo } from '@/store/Types';

type Props = {
  awardInfo: AwardInfo;
};

export default function HostAwardItem({ awardInfo }: Props) {
  const title = {
    IDEA_MACHINE: '단어를 가장 많이 입력한 말랑이',
    HIDDEN_FASTER: '히든 단어를 가장 빨리 찾은 말랑이',
    LAST_FIGHTER: '맨 마지막까지 최선을 다한 말랑이',
    QUICK_THINKER: '빈도수 가장 높은 단어 먼저 쓴 말랑이',
  };
  return (
    <div>
      <Confetti />
      <p className="text-black font-bold text-[2rem]">
        {title[awardInfo.type]}
      </p>
      <Image
        src={awardInfo.guest.imagePath}
        width={500}
        height={500}
        alt="award"
        className="h-[400px] w-[300px] relative left-24 mt-10 mb-32"
      />
      <Ribbon />
    </div>
  );
}
