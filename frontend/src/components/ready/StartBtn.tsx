import { gameStartApi } from '@/apis/apis';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function StartBtn() {
  const router = useRouter();
  const pin = useSelector((state: RootState) => state.gameinfo.id);

  const handleClick = async () => {
    const res = await gameStartApi(pin);
    if (res) {
      router.push('/game');
    }
  };

  return (
    <button
      className="bg-[#44474B] rounded text-white px-5 py-2"
      onClick={handleClick}
    >
      <p className="text-white font-semibold">게임 시작</p>
    </button>
  );
}
