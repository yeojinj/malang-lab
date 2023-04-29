'use client';

import { useState } from 'react';
import Router, { useRouter } from 'next/router';

export default function JoinPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');

  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleClickPin = () => {
    // 유효한 세션인지 확인 한후
    // 소켓 연결
    // 다음 페이지로 이동
    setStep(step => step + 1);
  };

  // step2 - 닉네임 입력하기
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(pin);
  };

  const handleClickNickname = () => {
    // 사용가능한 닉네임인지 확인하기
    let isValid = true;

    if (isValid) {
      // 다음 단계로 넘어가기
      setStep(step => step + 1);
    }
  };

  // step 3
  const handleClickJoin = () => {
    // 진짜 참여하기
    router.push('/ready');
  };

  return (
    <div
      className="w-[100vw] h-[100vh] bg-cover bg-center flex justify-center align-middle"
      style={{ backgroundImage: "url('/imgs/bg-2.png')" }}
    >
      {step === 0 && (
        <section className="w-[30%] flex flex-col justify-center align-middle gap-5">
          <p className="text-center text-5xl font-bold mb-5">참여하기</p>
          <input
            type="number"
            placeholder="PIN 번호"
            onChange={handleChangePin}
            className="block w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
          />
          <button className="button-black w-[60%]" onClick={handleClickPin}>
            참여하기
          </button>
        </section>
      )}
      {step === 1 && (
        <section className="w-[30%] flex flex-col justify-center align-middle gap-5">
          <p className="text-center text-5xl font-bold mb-5">닉네임 설정하기</p>
          <input
            type="number"
            placeholder="닉네임 입력"
            onChange={handleChangeNickname}
            className="block w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
          />
          <button
            className="button-black w-[60%]"
            onClick={handleClickNickname}
          >
            완료
          </button>
        </section>
      )}
      {step === 2 && (
        <section className="w-[80%] flex flex-col justify-center align-middle gap-10">
          <p className="text-center text-5xl font-bold">말랑이 생성하기</p>
          <div className="mx-auto">
            근데 여기에 이제 konva가 들어갋지 패브릭이 들어갈지 모를 일
          </div>
          <button className="button-black w-[20%]" onClick={handleClickJoin}>
            완료
          </button>
        </section>
      )}
    </div>
  );
}
