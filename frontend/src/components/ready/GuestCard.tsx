import Image from 'next/image';
import 'animate.css';

type Props = {
  guest: {
    name: string;
    image: string;
  };
};

export default function GuestCard({ guest }: Props) {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg,rgba(255, 255, 255, 0.6) 0%,rgba(255, 255, 255, 0.3) 100%)',
      }}
      className="shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] p-10 flex flex-col items-center animate__animated animate__slideInUp"
    >
      <Image
        src={`${guest.image}`}
        alt="char"
        width={100}
        height={100}
        className="motion-safe:animate-bounce"
      />
      <h1 className="text-center mt-5 text-xl font-medium">{guest.name}</h1>
    </div>
  );
}
