import { userOutApi } from "@/apis/apis"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function Check() {
    const guest = useSelector((state: RootState) => state.guest)
    const router = useRouter()
    const token = localStorage.getItem('token')

    // 새로고침 또는 페이지를 이동할 때
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
            userOutApi(guest.pin)
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

