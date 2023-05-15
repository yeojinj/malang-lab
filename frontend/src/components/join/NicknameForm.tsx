'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// apis
import { checkGuestInfoApi } from '@/apis/apis';
import { useSocket } from '@/context/SocketContext';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { Guest, setNicknameAction } from '@/store/guestSlice';
import { RootState } from '@/store/store';

export default function NicknameForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { publish } = useSocket();
  const Swal = require('sweetalert2');
  const guest = useSelector((state: RootState) => state.guest);
  const [nickname, setNickname] = useState('');
  const [imagePath, setImagePath] = useState('');

  // step3 - 닉네임 입력
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nickname.length > 7) {
      Swal.fire('7자 이하로 입력해주세요!', '', 'warning');
      setNickname(nickname.slice(0, 7));
    } else {
      setNickname(e.target.value);
    }
  };

  // 닉네임 저장
  const handleClickComplete = () => {
    dispatch(setNicknameAction(nickname));
  };

  // 엔터 키 입력 시에도 닉네임 저장
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClickComplete();
  };

  // 닉네임 저장 후 실행
  useEffect(() => {
    // 닉네임 준비 완료?
    if (guest.nickname !== '') {
      checkGuestInfo(guest);
    }
  }, [guest.nickname]);

  const checkGuestInfo = async (guest: Guest) => {
    // 닉네임 및 이미지 확인 api 전송
    let tmp = await checkGuestInfoApi(guest);
    if (tmp) {
      setImagePath(tmp);
    }
  };

  useEffect(() => {
    if (imagePath.length) {
      // 메세지 전송
      const destination = `/topic/room.${guest.pin}`;
      const type = 'JOIN';
      const message = {
        id: guest.pin,
        nickname: guest.nickname,
        imagePath,
      };
      publish(destination, type, message);
      router.push('/ready');
    }
  }, [imagePath]);

  return (
    <section className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col justify-center align-middle gap-5">
      <p className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
        닉네임 설정하기
      </p>
      <input
        value={nickname}
        type="text"
        placeholder="닉네임 입력"
        onChange={handleChangeNickname}
        onKeyPress={handleKeyPress}
        className="block w-[80%] sm:w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
      />
      <button
        className="button-black w-[80%] sm:w-[60%] h-12 mx-auto rounded-[5px] text-lg"
        onClick={handleClickComplete}
      >
        완료
      </button>
    </section>
  );
}
