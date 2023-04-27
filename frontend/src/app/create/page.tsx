'use client'

import ModeCard from '@/components/create/ModeCard';
import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

const modes = [{
  title: '개인전',
  desc: '인생은 혼자! 개인으로 즐겨요'
}, {
  title: '팀전',
  desc: "팀원과 함께하면 즐거움이 N배에요"
}]

export default function CreatePage() {
  const [step, setStep] = useState(0)

  const handleClickStep = () => {
    setStep((num) => (num%2)+1)
  }

  return <div className="w-[100vw] h-[100vh] bg-cover bg-center flex justify-center align-middle" style={{ backgroundImage: "url('/imgs/bg-3.png')" }}>
    <section className="glass w-[70%] h-[90%] border-2 m-auto flex ">
      <div className='w-[90%] md:w-[80%] lg:w-[70%] mx-auto my-7 flex flex-col justify-center align-middle'>
        <div className='w-[50%] mx-auto flex justify-center align-middle'>
          <input placeholder="말랑이의 연구소" className="bg-transparent p-3 mr-4 border-b-[3px] border-black placeholder-black placeholder:text-2xl placeholder:text-center placeholder:font-bold" />
          <PencilIcon className='w-7' />
        </div>
        {step%2 ? <>
          {/* 모드 선택하기 */}
          <div className='flex flex-col w-full m-auto'>
            <p className='my-1.5'>모드 선택하기</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-7'>
              {modes.map((mode) => <ModeCard key={mode.title} mode={mode} />)}
            </div>
          </div>
          {/* 게임 선택하기 */}
          <button className='bg-white w-[80px] h-[40px] rounded-md mx-auto my-3' onClick={handleClickStep}>다음</button>
        </> : <>
          <p>컴포넌트 2</p>
          <p>게임 환경 설정</p>
          <button className='bg-white w-[80px] h-[40px] rounded-md mx-auto my-3' onClick={handleClickStep}>이전</button>
        </>}
      </div>
    </section>
  </div>;
}
