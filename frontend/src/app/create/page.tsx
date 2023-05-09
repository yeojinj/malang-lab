'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
// components
import ModeCard from '@/components/create/ModeCard';
import RoundSetting from '@/components/create/RoundSetting';
import GameCard from '../../components/create/GameCard';
// redux
import { RootState } from '@/store/store';
import gameInfoSlice, {
  addRoundAction,
  changekeywordAction,
  deleteRoundAction,
  gameAction,
  modeAction,
  setTitleAction,
} from '../../store/gameInfoSlice';
import { setPinAction } from '@/store/guestSlice';
import { updateStatus } from '@/store/statusSlice';
// apis
import { makeRoomApi } from '@/apis/apis';
import Loading from '@/components/common/Loading';

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
    title2: '재미있는 아이디어 확장?',
    title1: '브레인 스토밍',
    desc: [
      '주어진 문제를 해결할 방법은?',
      '오잉? 스러운 아이디어 환영!',
      '아이디어는 가능한 많이!',
    ],
  },
];

export default function CreatePage() {
  let gameinfo = useSelector((state: RootState) => state.gameinfo);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  // 1. 방 정보 설정 상태
  const [step, setStep] = useState(0);
  const [selectedMode, setMode] = useState(gameinfo.mode);
  const [selectedGame, setGame] = useState(gameinfo.name);
  const [title, setTitle] = useState(gameinfo.title);

  // 방제목 설정하기
  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    dispatch(setTitleAction(e.target.value))
    console.log(e.target.value)
  };

  // 게임 모드 선택하기
  const handleClickMode = (id: string) => {
    if (selectedMode === id) {
      dispatch(modeAction(''));
      setMode('');
      return;
    }
    dispatch(modeAction(id));
    setMode(id);
  };

  // 진행할 게임 선택하기
  const handleClickGame = (id: string) => {
    if (selectedGame === id) {
      setGame('');
      dispatch(gameAction(''));
      return;
    }
    dispatch(gameAction(id));
    setGame(id);
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
  const handleClickCreate = async () => {
    if(checkIsValid()) {
      // setIsLoading(true)
      const res = await makeRoomApi(gameinfo);
      // setIsLoading(false)
      // 방 만들기가 성공했을 때에만 실행
      if (res) {
        // 방의 pin 번호 redux에 저장
        dispatch(setPinAction(res.data.id))
        // 대기방으로 입장
        // router.push('/ready')
        // host 상태 업데이트
        dispatch(updateStatus())
      }
    } else {
      alert('라운드 정보를 빠짐 없이 입력해주세요!')
      return
    }
  };

  // 라운드 정보 유효성 검사
  const checkIsValid = () => {
    return gameinfo.settings.every((setting) => {
      return (setting.keyword!=='' && setting.hidden!=='')
    })
  }

  return (
    <div
      className="min-h-screen bg-cover flex flex-col align-middle bg-center justify-center"
      style={{ backgroundImage: "url('/imgs/bg-3.png')" }}
    >
      {isLoading && <Loading />}
      <section className="glass w-[70%] min-h-[90vh] border-2 mx-auto flex my-5">
        <div className="w-[70%] md:w-[80%] lg:w-[70%] gap-3 mx-auto py-8 flex flex-col">
          <div className="w-[50%] mx-auto flex border-b-[2px] border-black">
            <>
              <input
                onChange={handleInputName}
                placeholder={title}
                className="bg-transparent w-[90%] text-2xl font-bold text-black placeholder-[#8A8A8A] placeholder:text-2xl placeholder:text-center placeholder:font-bold text-center"
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
