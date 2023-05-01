import Image from 'next/image';

type Props = {
  code: number;
};

export default function PinCode({ code }: Props) {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg,rgba(255, 255, 255, 0.5) -0.19%,rgba(255, 255, 255, 0.25) 99.81%)',
      }}
      className="w-[470px] h-[150px] shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] m-10"
    >
      <div className="flex">
        <Image
          className="mx-5 my-3"
          src={'/imgs/character.png'}
          alt="character"
          width={130}
          height={130}
        />
        <h1 className="text-[5rem] text-[#44474B] font-extrabold">{code}</h1>
      </div>
    </div>
  );
}
