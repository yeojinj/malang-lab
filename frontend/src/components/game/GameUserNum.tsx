import { HiUsers } from 'react-icons/hi';

type Props = {
    num: number;
  };

export default function GameUserNum({num}: Props) {
    return (
        <div className='flex mr-auto ml-10'>
           <HiUsers size={70} className="text-white relative top-3" />
           <h1 className='text-white text-[4rem] font-bold ml-2'>{num}</h1>
        </div>
    );
}

