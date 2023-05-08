import Image from 'next/image';

type Props = {
  text: string;
};

export default function AlertBox({ text }: Props) {
  return (
    <div className="bg-white shadow-[7px_7px_10px_rgba(0,0,0,0.25)] rounded-[10px] absolute w-[50vw] z-20">
      <Image src={'/imgs/tulip.png'} width={100} height={50} alt="tulip" className='absolute top-[-35px] left-[-20px]' />
      <Image src={'/imgs/mini-together.png'} width={100} height={50} alt="tulip" className='absolute bottom-[-20px] right-[-30px]' />
      <h1 className="font-bold text-[#44474B] text-[2rem] py-10 text-center sm:text-[3rem]">
        {text}
      </h1>
    </div>
  );
}
