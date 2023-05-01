import WordCard from './WordCard';

type Props = {
  words: string[];
};

export default function WordsGrid({ words }: Props) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[3%] gap-y-8'>
      {words.map(word => (
        <li key={word}>
          <WordCard word={word} />
        </li>
      ))}
    </ul>
  );
}
