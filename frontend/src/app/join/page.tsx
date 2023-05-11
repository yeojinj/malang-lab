'use client';

import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { RootState } from '@/store/store';
import CustomSection from '@/components/profile/CustomSection';
import { setNicknameAction, setPinAction } from '@/store/guestSlice';
// apis
import PinForm from '@/components/join/PinForm';
import NicknameForm from '@/components/join/NicknameForm';
import { useSocket } from '@/context/SocketContext';

export default function JoinPage() {
  const guest = useSelector((state: RootState) => state.guest);
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
