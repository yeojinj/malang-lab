'use cleint';

import { AwardInfo } from '@/store/Types';
import Carousel from '../common/Carousel';
import Confetti from './Confetti';

type Props = {
  awardDatas: AwardInfo[];
};

export default function HostAward({ awardDatas }: Props) {
  return (
    <>
      <Confetti />
      <div className="text-center">
        {awardDatas?.length !== 0 && <Carousel items={awardDatas} />}
      </div>
    </>
  );
}
