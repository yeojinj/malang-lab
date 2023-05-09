import Image from 'next/image';

type Props = {
  text: string;
};

export default function AlertBox({ text }: Props) {
  const tulip = 'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/tulip-malang.png'
  const mini = 'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/mini-together.png'

  return (
    <div className="bg-white shadow-[7px_7px_10px_rgba(0,0,0,0.25)] rounded-[10px] absolute w-[90vw] sm:w-[50vw] z-20">
      <Image src={tulip} width={100} height={50} alt="tulip" className='absolute top-[-35px] left-[-20px]' />
      <Image src={mini} width={100} height={50} alt="tulip" className='absolute bottom-[-25px] right-[-15px]' />
      <h1 className="font-bold text-[#44474B] text-[2rem] py-7 text-center sm:text-[3rem]">
        {text}
      </h1>
    </div>
  );
}
