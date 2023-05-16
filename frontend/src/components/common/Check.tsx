'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// apis
import { guestOutApi, hostOutApi } from '@/apis/apis';
// redux
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { guestOutAction } from '@/store/readyInfoSlice';
import { Guest } from '@/store/guestSlice';
import useToken from '@/hooks/useToken';

export default function Check() {
  const guest: Guest = useSelector((state: RootState) => state.guest);
  const isHost: boolean = useSelector((state: RootState) => state.status.isHost);
  const pin: number = useSelector((state: RootState) => state.gameinfo.id);
  const router = useRouter();
  const { getToken } = useToken();
  const token = getToken();

  // 새로고침 또는 페이지를 이동할 때
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';

      // 호스트이면 방 폭파
      console.log('폭파 전,,,,');
      if (isHost) {
        console.log('폭파 호스트 확인 점,,,,');
        hostOutApi(String(pin));
        router.push('/')
      }
      // 게스트 이면 퇴장 알리기
      else {
        if(guest.pin.length) {
          console.log('나가는 게스트 확인.,,,');
          // api 요청
          guestOutApi(guest?.pin);
          // 리스트에 반영
          guestOutAction(guest?.nickname);
          router.push('/')
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [guest, pin]);

  // 토큰이 없는 경우 홈화면으로
  // useEffect(() => {
  //   if (!token) router.push('/');
  // }, [token]);

  return null;
}
