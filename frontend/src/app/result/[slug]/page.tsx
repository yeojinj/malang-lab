import WordCarousel from '@/components/result/Carousel';
import HiddenWord from '@/components/result/HiddenWord';
import WordCloud from '@/components/result/WordCloud';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

export default function ResultCardPage({ params }: Props) {
  return (
    <div className="h-screen overflow-x-hidden bg-cover bg-bg-3 flex flex-col items-center justify-center">
      {params.slug === 'wordcloud' && <WordCloud />}
      {params.slug === 'hiddenword' && <HiddenWord />}
      {params.slug === 'creativeword' && <WordCarousel />}
      <Link
        href="/result"
        className="bg-[#44474B] font-semibold rounded text-white px-10 py-2"
      >
        돌아가기
      </Link>
    </div>
  );
}
