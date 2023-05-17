import Link from 'next/link';
import Lock from '../common/Lock';

type Props = {
  card: {
    pathName: string;
    title: string;
    description: string;
  };
};
export default function ResultCard({ card }: Props) {
  return (
    <Link href={`/result/${card.pathName}`}>
      <section className={`text-center bg-box-gradient hover:text-white flex flex-col justify-center items-center gap-3 p-5 lg:p-10 rounded shadow-lg w-72 hover:scale-[1.05] relative ${card.title === '특별한 아이디어' ? 'pointer-events-none' : ''}`}>
        {card.title === '특별한 아이디어' && <Lock />}
        <h1 className="text-2xl font-bold">{card.title}</h1>
        <p>{card.description}</p>
      </section>
    </Link>
  );
}
