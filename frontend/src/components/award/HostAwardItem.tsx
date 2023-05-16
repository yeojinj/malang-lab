import Image from 'next/image';
import Ribbon from './Ribbon';
import Confetti from './Confetti';
import { AwardInfo } from '@/store/Types';

type Props = {
  awardInfo: AwardInfo;
};

export default function HostAwardItem({ awardInfo }: Props) {
  const award = {
    IDEA_MACHINE: {
      title: '단어를 가장 많이 입력한 말랑이',
      imagePath:
        'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/snowman.png',
    },
    HIDDEN_FASTER: {
      title: '히든 단어를 가장 빨리 찾은 말랑이',
      imagePath:
        'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/cat-malang.png',
    },
    LAST_FIGHTER: {
      title: '맨 마지막까지 최선을 다한 말랑이',
      imagePath:
        'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/pingu.png',
    },
    QUICK_THINKER: {
      title: '빈도수 가장 높은 단어 먼저 쓴 말랑이',
      imagePath:
        'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/frog.png',
    },
  };

  console.log(awardInfo, 'awardinfo')

  return (
    <div>
      <Confetti />
      <p className="text-black font-bold text-[2rem]">
        {award[awardInfo?.type].title}
      </p>
      <Image
        src={award[awardInfo?.type].imagePath}
        width={500}
        height={500}
        alt="award"
        className="h-[400px] w-[300px] relative left-24 mt-10 mb-32"
      />
      <Ribbon nickname={awardInfo?.guest.nickname} />
    </div>
  );
}
