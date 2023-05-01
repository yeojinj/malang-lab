import Confetti from '@/components/award/Confetti';
import Ribbon from '@/components/award/ribbon';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="w-[100vw] h-[100vh] bg-bg-2 bg-cover bg-center flex justify-center align-middle relative -z-10">
      <p className="mt-14 text-black font-bold text-[2rem] absolute">
        히든 단어를 가장 먼저 맞춘 말랑이!
      </p>
      <Image
        src={'/imgs/cat.png'}
        width={500}
        height={500}
        alt="award"
        className="h-[400px] w-[300px] relative top-36"
      />
      <Ribbon />
      <Confetti />
    </div>
  );
}
