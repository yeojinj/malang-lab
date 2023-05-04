'use client';

import ModeCard from '@/components/create/ModeCard';
import RoundSetting from '@/components/create/RoundSetting';
import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import gameInfoSlice, {
  addRoundAction,
  changekeywordAction,
  deleteRoundAction,
  gameAction,
  modeAction,
} from '../../store/gameInfoSlice';
import GameCard from '../../components/create/GameCard';
import { makeRoomApi } from '@/apis/apis';

const modes = [
  {
    id: 'SOLO',
    title: '개인전',
    desc: '인생은 혼자! 개인으로 즐겨요',
  },
  {
    id: 'TEAM',
    title: '팀전',
    desc: '팀원과 함께하면 즐거움이 N배에요',
  },
];

const games = [
  {
    id: 'WORD',
    title2: '누가누가 말랑이 일까?',
    title1: '단어로 뇌밍업',
    desc: [
      '제시어에 따른 연상단어 입력',
      '단어를 빨리빨리! 순발력',
      '단어를 많이많이! 사고력',
    ],
  },
  {
    id: 'NOTYET',
    title2: '누가누가 말랑이 일까?',
    title1: '단어로 뇌밍업',
    desc: [
      '제시어에 따른 연상단어 입력',
      '단어를 빨리빨리! 순발력',
      '단어를 많이많이! 사고력',
    ],
  },
];

export default function CreatePage() {
  let gameinfo = useSelector((state: RootState) => state.gameinfo);
  const dispatch = useDispatch();

  // 1. 방 정보 설정 상태
  const [step, setStep] = useState(0);
  const [selectedMode, setMode] = useState(gameinfo.mode);
  const [selectedGame, setGame] = useState(gameinfo.name);

  // 게임 모드 선택하기
  const handleClickMode = (id: string) => {
    if (selectedMode === id) {
      setMode('');
      return;
    }
    dispatch(modeAction(id));
    setMode(id);
    console.log(id, 'mode');
  };

  // 진행할 게임 선택하기
  const handleClickGame = (id: string) => {
    if (selectedGame === id) {
      setGame('');
      return;
    }
    dispatch(gameAction(id));
    setGame(id);
    console.log(id, 'game');
  };

  // 다음, 이전 컴포넌트로 이동하기
  const handleClickStep = () => {
    if (step === 0) {
      if (selectedGame === '') {
        alert('게임을 선택하세요!');
        return;
      }
      if (selectedMode === '') {
        alert('모드를 선택하세요!');
        return;
      }
    }
    setStep((num: number) => (num % 2) + 1);
  };

  // 라운드 세팅 추가하기
  const handleClickAdd = () => {
    if (gameinfo.settings.length === 3) {
      alert('최대 3라운드까지 가능해요!');
      return;
    }
    dispatch(addRoundAction());
  };

  // 라운드 수 제거하기
  const handleClickDelete = (idx: number) => {
    if (gameinfo.settings.length === 1) return;
    dispatch(deleteRoundAction(idx));
  };

  // 방 만들기
  const handleClickCreate = () => {
    const res = makeRoomApi(gameinfo);
    // 여기다 이제 소켓 연결하는 함수 만들자,,
  };

  return (
    <div
      className="min-h-screen bg-cover flex flex-col align-middle bg-center justify-center"
      style={{ backgroundImage: "url('/imgs/bg-3.png')" }}
    >
      <section className="glass w-[70%] min-h-[90vh] border-2 mx-auto flex my-5">
        <div className="w-[70%] md:w-[80%] lg:w-[70%] gap-3 mx-auto py-8 flex flex-col">
          <div className="w-[70%] mx-auto flex border-b-[2px] border-black">
            <>
              <input
                placeholder="말랑이의 연구소"
                className="bg-transparent w-[93%] text-2xl font-bold text-black placeholder-black placeholder:text-2xl placeholder:text-center placeholder:font-bold text-center"
              />
            </>
            <PencilIcon className="w-[7%]" />
          </div>
          {/* 1. 게임 설정 컴포넌트 */}
          {!(step % 2) ? (
            <>
              {/* 모드 선택하기 */}
              <div className="flex flex-col w-full m-auto">
                <p className="my-1.5">모드 선택하기</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-7">
                  {modes.map(mode => (
                    <div key={mode.title}>
                      <ModeCard
                        mode={mode}
                        handleClickMode={handleClickMode}
                        selectedMode={selectedMode}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* 게임 선택하기 */}
              <div className="flex flex-col w-full m-auto">
                <p className="my-1.5">진행할 게임 선택하기</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-7">
                  {games.map(game => (
                    <div key={game.id}>
                      <GameCard
                        game={game}
                        handleClickGame={handleClickGame}
                        selectedGame={selectedGame}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="bg-white w-[80px] h-[40px] rounded-md mx-auto mt-5"
                onClick={handleClickStep}
              >
                다음
              </button>
            </>
          ) : (
            // 2. 라운드 설정 컴포넌트
            <>
              <div className="mt-3 h-[90%]">
                <div className="h-[60vh] overflow-y-scroll scrollbar-thumb-lightgray scrollbar-none flex flex-col rounded-md">
                  {gameinfo.settings.map((setting: any, idx) => (
                    <div key={idx}>
                      <RoundSetting
                        handleClickDelete={handleClickDelete}
                        setting={setting}
                        idx={idx}
                      />
                    </div>
                  ))}
                  <button
                    className="bg-white w-20 mt-2 mx-auto"
                    onClick={handleClickAdd}
                  >
                    추가
                  </button>
                </div>
                <div className="flex justify-center absolute bottom-7 left-[50%] translate-x-[-50%]">
                  <button
                    className="bg-white w-[80px] h-12 rounded-[5px] mr-3"
                    onClick={handleClickStep}
                  >
                    이전
                  </button>
                  <button
                    className="button-black w-[200px] mx-0"
                    onClick={handleClickCreate}
                  >
                    방 만들기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
