'use client';

import ModeCard from '@/components/create/ModeCard';
import RoundSetting from '@/components/create/RoundSetting';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { pushAction } from '../../store/roundSlice'

const modes = [
  {
    title: '개인전',
    desc: '인생은 혼자! 개인으로 즐겨요',
  },
  {
    title: '팀전',
    desc: '팀원과 함께하면 즐거움이 N배에요',
  },
];

export default function CreatePage() {
  // 1. 방 정보 설정 상태
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('');
  const [game, setGame] = useState('');

  // 2. 라운드 정보 설정 상태
  const dispatch = useDispatch()
  let rounds = useSelector((state: RootState) => state.round)
  const [roundInfos, setRoundInfos] = useState(rounds);

  // 다음, 이전 컴포넌트로 이동하기
  const handleClickStep = () => {
    setStep(num => (num % 2) + 1);
  };

  // 라운드 세팅 추가하기
  const handleClickAdd = () => {
    if (roundInfos.length === 3) {
      alert('최대 3라운드까지 가능해요!')
      return;
    }

    let nextState = rounds.concat({
      topic: '',
      hidden: '',
      seconds: 0,
    })

    // 상태값 변경하기
    setRoundInfos(nextState)
    // redux에 반영하기
    dispatch(pushAction(nextState))
  };

  // 라운드 수 제거하기
  const handleClickDelete = (idx: number) => {
    // console.log(idx) 
    // console.log(roundInfos, '🎈')
    // let tmp = roundInfos
    // let nextState = tmp.splice(idx, 1)
    // console.log(nextState)
  };

  // 방 만들기
  const handleClickCreate = () => {
    // 여기다 이제 소켓 연결하는 함수 만들자,,
   };

  return (
    <div
      className="w-[100vw] h-[100vh] bg-cover bg-center flex justify-center align-middle"
      style={{ backgroundImage: "url('/imgs/bg-3.png')" }}
    >
      <section className="glass w-[70%] h-[90%] border-2 m-auto flex ">
        <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-8 flex flex-col align-middle">
          <div className="mx-auto flex justify-center align-middle">
            <input
              placeholder="말랑이의 연구소"
              className="bg-transparent p-3 mr-4 border-b-[3px] border-black placeholder-black placeholder:text-2xl placeholder:text-center placeholder:font-bold"
            />
            <PencilIcon className="w-7" />
          </div>
          {/* 1. 게임 설정 컴포넌트 */}
          {!(step % 2) ? (
            <>
              {/* 모드 선택하기 */}
              <div className="flex flex-col w-full m-auto">
                <p className="my-1.5">모드 선택하기</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-7">
                  {modes.map(mode => (
                    <ModeCard key={mode.title} mode={mode} />
                  ))}
                </div>
              </div>
              {/* 게임 선택하기 */}
              <button
                className="bg-white w-[80px] h-[40px] rounded-md mx-auto my-3"
                onClick={handleClickStep}
              >
                다음
              </button>
            </>
          ) : (
            // 2. 라운드 설정 컴포넌트
            <>
              <div className='mt-5 h-[90%]'>
                <div className='h-[80%] overflow-y-scroll scrollbar-thumb-lightgray'>
                  {roundInfos.map((roundinfo, idx) => <RoundSetting handleClickDelete={handleClickDelete} roundinfo={roundinfo} idx={idx} key={idx} />)}
                </div>
                <button
                  className="bg-white w-[80px] h-[40px] rounded-md mx-auto my-3"
                  onClick={handleClickStep}
                >
                  이전
                </button>
                <button className="bg-white w-20 m-2" onClick={handleClickAdd}>
                  추가
                </button>
                <button
                  className="bg-white w-20 m-2"
                  onClick={handleClickCreate}
                >
                  방 만들기
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
