'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
// redux
import { RootState } from '@/store/store';
import { setNicknameAction, setPinAction } from '@/store/guestSlice';
// Components
import CustomProfile from '@/components/profile/CustomProfile';
// apis
import { checkPinApi } from '@/apis/apis';
import PinForm from '@/components/join/PinForm';
import NicknameForm from '@/components/join/NicknameForm';

export default function JoinPage() {
  const dispatch = useDispatch();
  const guest = useSelector((state: RootState) => state.guest);
  // const router = useRouter();
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleClickPin = async () => {
    if (pin === '') {
      alert('PIN 번호를 입력해주세요!');
      return;
    }
    //404599

    // 유효한 세션인지 확인 한후
    const isValid = await checkPinApi(Number(pin));
    if (isValid) {
      // 소켓 연결!!!

      // 리덕스에 저장
      dispatch(setPinAction(pin));
      // 다음 페이지로 이동
      setStep(step => step + 1);
    } else {
      alert('유효한 PIN 번호가 아닙니다!')
    }
  };

  // step2 - 닉네임 입력하기


  const handleClickNickname = () => {
    // 사용가능한 닉네임인지 확인하기
    // 닉네임 저장하기
    dispatch(setNicknameAction(nickname));
    // 다음 단계로 넘어가기
    setStep(step => step + 1);
  };

  // step 3 - 캐릭터 생성하기
  const handleClickJoin = () => {
    // 진짜 참여하기
    // router.push('/ready');
  };

  return (
    <div
      className="w-[100vw] h-[100vh] bg-cover bg-center flex justify-center align-middle"
      style={{ backgroundImage: "url('/imgs/bg-2.png')" }}
    >
      {step === 0 && (
        <PinForm handleClickPin={handleClickPin} setPin={setPin} />
      )}
      {/* 닉네임 설정하기 */}
      {step === 1 && (
        <NicknameForm handleClickNickname={handleClickNickname} setNickname={setNickname} />
      )}
      {/* 캐릭터 생성하기 */}
      {step === 2 && (
        <section className="w-[80%] flex flex-col justify-center align-middle gap-10">
          <p className="text-center text-5xl font-bold">말랑이 생성하기</p>
          <div className="mx-auto">
            <CustomProfile />
          </div>
          <button className="button-black w-[20%]" onClick={handleClickJoin}>
            완료
          </button>
        </section>
      )}
    </div>
  );
}
