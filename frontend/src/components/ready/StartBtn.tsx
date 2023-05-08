import Link from 'next/link';

export default function StartBtn() {
  return (
    <button className="bg-[#44474B] rounded text-white px-5 py-2">
      <Link href="/game">
        <p className="text-white font-semibold">게임 시작</p>
      </Link>
    </button>
  );
}