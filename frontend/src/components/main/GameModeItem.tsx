import { Mode } from "@/app/page";
import Link from 'next/link';
import Image from "next/image";
import blue from '../../../public/imgs/blue-malang.png';
import yellow from '../../../public/imgs/yellow-malang.png'
import together from '../../../public/imgs/together-malang.png'
import Lock from "../common/Lock";

type Props = {
    mode: Mode
}

export default function GameModeItem({ mode }: Props) {
    return <Link href={`/${mode.path}`} className="relative bg-white w-[32%] rounded-[10px] flex flex-col justify-center align-middle py-10 hover:scale-[1.02]">
        {mode.name=== '방 만들기' && <Image src={blue} alt="" className="w-[90%] mx-auto mt-2 mb-4" />}
        {mode.name=== '참여하기' && <Image src={together} alt="" className="w-[90%] mx-auto mt-2 mb-4" />}
        {mode.name === '혼자하기' && <Lock />}
        {mode.name=== '혼자하기' && <Image src={yellow} alt="" className="w-[90%] mx-auto mt-2 mb-4" />}
        
        <p className="text-center text-2xl my-2 font-bold">
            {mode.name}
        </p>
    </Link>;
}

