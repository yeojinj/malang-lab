import ResultCard from '@/components/result/ResultCard';

const cards = [
  {
    pathName: 'wordcloud',
    title: '워드 클라우드',
    description: '단어들을 한눈에!',
  },
  {
    pathName: 'hiddenword',
    title: '히든 단어',
    description: '히든 단어를 알아볼까요?',
  },
  {
    pathName: 'creativeword',
    title: '특별한 아이디어',
    description: '자주 언급되지 않은 단어!',
  },
];

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-cover bg-bg-3 flex flex-col justify-center items-center gap-20">
      <header className="text-4xl font-bold">
        총 {'100'}개의 단어를 생각했어요!
      </header>
      <nav className="flex justify-center items-center gap-10">
        {cards.map(card => (
          <ResultCard key={card.title} card={card} />
        ))}
      </nav>
      <button className="bg-[#44474B] font-semibold rounded text-white px-10 py-2">
        다음 라운드 가기
      </button>
    </div>
  );
}
