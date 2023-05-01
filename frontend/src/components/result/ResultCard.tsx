import Link from 'next/link';

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
      <section className="text-center bg-box-gradient   hover:text-white flex flex-col justify-center items-center gap-5 p-10 rounded shadow-lg">
        <h1 className="text-2xl font-bold">{card.title}</h1>
        <p>{card.description}</p>
      </section>
    </Link>
  );
}
