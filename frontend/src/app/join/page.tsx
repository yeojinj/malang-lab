'use client';

import { useState } from 'react';
// redux
import CustomSection from '@/components/profile/CustomSection';
// apis
import PinForm from '@/components/join/PinForm';
import NicknameForm from '@/components/join/NicknameForm';

export default function JoinPage() {
  const [step, setStep] = useState(0);

  return (
    <div
      className="w-[100vw] min-h-[100vh] bg-cover bg-center flex justify-center align-middle"
      style={{ backgroundImage: "url('/imgs/bg-2.png')" }}
    >
      {step === 0 && <PinForm setStep={setStep} />}
      {/* 캐릭터 생성하기 */}
      {step === 1 && <CustomSection setStep={setStep} />}
      {/* 닉네임 설정하기 */}
      {step === 2 && <NicknameForm />}
    </div>
  );
}
