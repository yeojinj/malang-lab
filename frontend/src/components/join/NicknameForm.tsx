import { setGuestInfo } from "@/apis/apis";
import { setImageAction, setNicknameAction } from "@/store/guestSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isGeneratorFunction } from "util/types";

export default function NicknameForm() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [nickname, setNickname] = useState('')
    const guest = useSelector((state: RootState) => state.guest)

    // step3 - 닉네임 입력하기
    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    // 닉네임 저장하기
    const handleClickComplete = async () => {
        dispatch(setNicknameAction(nickname));
    };

    const setGuestInfoFunction = async () => {
        const imagePath = await setGuestInfo(guest)
        dispatch(setImageAction(imagePath))
        return imagePath
    }

    useEffect(() => {
        if (guest.nickname.trim()) {
            if(setGuestInfoFunction()) {
                
                router.push('/ready')
            }
        }
    }, [guest.nickname])

    return (
        <section className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col justify-center align-middle gap-5">
            <p className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
                닉네임 설정하기
            </p>
            <input
                type="text"
                placeholder="닉네임 입력"
                onChange={handleChangeNickname}
                className="block w-[80%] sm:w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
            />
            <button
                className="button-black w-[80%] sm:w-[60%]]"
                onClick={handleClickComplete}
            >
                완료
            </button>
        </section>
    );
}

