type Props = {
  num: number;
};

export default function WordNum({ num }: Props) {
  return (
    <div className="absolute top-20">
      <span className="text-[#FF5C66] text-[5rem] font-bold">{num}</span>
      <span className="text-[#44474B] text-[2.5rem] font-bold">개의 단어!</span>
    </div>
  );
}
