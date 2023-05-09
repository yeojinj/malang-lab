import Image from 'next/image';
import Ribbon from './Ribbon';

type Props = {
  text: string;
  imgPath: string;
};

export default function HostAward({ text, imgPath }: Props) {
  return (
    <div>
      <p className="text-black font-bold text-[2rem]">
        {text}
      </p>
      <Image
        src={`/imgs/${imgPath}.png`}
        width={500}
        height={500}
        alt="award"
        className="h-[400px] w-[300px] relative left-24 mt-10 mb-32"
      />
      <Ribbon />
    </div>
  );
}
