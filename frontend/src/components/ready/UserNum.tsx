import { FaUser } from 'react-icons/fa';

type Props = {
  num: number;
};

export default function UserNum({ num }: Props) {
  return (
    <div className="flex justify-end pr-[17%]">
      <FaUser size={25} />
      <h1 className="text-[#44474B] text-xl font-bold ml-1">{num}</h1>
    </div>
  );
}
