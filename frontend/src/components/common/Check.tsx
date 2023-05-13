'use client';

import { guestOutApi, hostOutApi } from "@/apis/apis"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function Check() {
    const guest = useSelector((state: RootState) => state.guest)
    const isHost = useSelector((state: RootState) => state.status.isHost)
    const pin = useSelector((state: RootState) => state.gameinfo.id)
    const router = useRouter()
    const token = localStorage.getItem('token')

    // 새로고침 또는 페이지를 이동할 때
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';

            // 호스트이면 방 폭파
            if(isHost) hostOutApi(String(pin))
            // 게스트 이면 퇴장 알리기
            else guestOutApi(guest.pin)
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [guest])

    // 토큰이 없는 경우 홈화면으로
    useEffect(() => {
        if (!token) router.push('/')
    }, [token])

    return null;
}

