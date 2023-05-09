import { Mode } from "@/app/page";
import Link from 'next/link';
import Lock from "../common/Lock";

type Props = {
    mode: Mode
}

export default function GameModeItem({ mode }: Props) {
    return <Link href={`/${mode.path}`} className={`relative bg-white w-[95%] m-auto my-2 rounded-[10px] flex flex-col justify-center align-middle py-5 sm:py-10 ${mode.path==='' ? '':'hover:scale-[1.02]'}`}>
        {mode.name=== '방 만들기' && <img src='https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/blue-malang.png' alt="" className="w-[50%] sm:w-[90%] mx-auto mt-2 mb-4" />}
        {mode.name=== '참여하기' && <img src='https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/together-malang.png' alt="" className="w-[50%] sm:w-[90%] mx-auto mt-2 mb-4" />}
        {mode.name === '혼자하기' && <Lock/>}
        {mode.name=== '혼자하기' && <img src='https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/yellow-malang.png' alt="" className="w-[50%] sm:w-[90%] mx-auto mt-2 mb-4" />}
        <p className="text-center text-2xl my-2 font-bold">
            {mode.name}
        </p>
    </Link>;
}

