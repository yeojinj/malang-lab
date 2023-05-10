'use client';

import { useState } from 'react';
import Router, { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { RootState } from '@/store/store';
import CustomSection from '@/components/profile/CustomSection';
import { setNicknameAction, setPinAction } from '@/store/guestSlice';
// apis
import { checkPinApi } from '@/apis/apis';
import PinForm from '@/components/join/PinForm';
import NicknameForm from '@/components/join/NicknameForm';
import { useSocket } from '@/context/SocketContext';

export default function JoinPage() {
  const { client } = useSocket();
  const router = useRouter();
  const dispatch = useDispatch();
  const guest = useSelector((state: RootState) => state.guest);
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(2);
  const [nickname, setNickname] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  //404599
  const handleClickPin = async () => {
    if (pin === '') {
      alert('PIN 번호를 입력해주세요!');
      return;
    }

    // 유효한 세션인지 확인 한후
    const isValid = await checkPinApi(Number(pin));
    if (isValid) {
      // 소켓 연결!!!
      client.subscribe(`/topic/room.${pin}`, console.log);
      // 리덕스에 저장
      dispatch(setPinAction(pin));
      // 다음 페이지로 이동
      setStep(step => step + 1);
    } else {
      alert('유효한 PIN 번호가 아닙니다!');
    }
  };

  // step2 - 닉네임 입력하기
  const handleClickNickname = () => {
    // 닉네임 저장하기
    dispatch(setNicknameAction(nickname));
    // 다음 단계로 넘어가기
    setStep(step => step + 1);
  };

  // step 3 - 캐릭터 생성하기
  const handleClickJoin = async () => {
    await setIsCompleted(true);
    // 진짜 참여하기
    router.push('/ready');
  };

  return (
    <div
      className="w-[100vw] min-h-[100vh] bg-cover bg-center flex justify-center align-middle"
      style={{ backgroundImage: "url('/imgs/bg-2.png')" }}
    >
      {step === 0 && (
        <PinForm handleClickPin={handleClickPin} setPin={setPin} />
      )}
      {/* 닉네임 설정하기 */}
      {step === 1 && (
        <NicknameForm
          handleClickNickname={handleClickNickname}
          setNickname={setNickname}
        />
      )}
      {/* 캐릭터 생성하기 */}
      {step === 2 && (
        <section className="w-[80%] flex flex-col justify-center align-middle gap-2 lg:gap-10">
          <p className="text-center text-2xl lg:text-5xl font-bold">
            말랑이 생성하기
          </p>
          <div className="mx-auto">
            <CustomSection isCompleted={isCompleted} />
          </div>
          <button className="button-black w-[20%]" onClick={handleClickJoin}>
            완료
          </button>
        </section>
      )}
    </div>
  );
}
