'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
// components
import ModeCard from '@/components/create/ModeCard';
import RoundSetting from '@/components/create/RoundSetting';
import GameCard from '../../components/create/GameCard';
import Loading from '../loading';
// redux
import { RootState } from '@/store/store';
import {
  setPincodeAction,
  addRoundAction,
  deleteRoundAction,
  gameAction,
  modeAction,
  setNameAction,
} from '../../store/gameInfoSlice';
import { updateStatus } from '@/store/statusSlice';
// apis
import { makeRoomApi } from '@/apis/apis';
import { HandleTopic } from '@/libs/handleTopic';
import { HandleQueue } from '@/libs/handleQueue';
import { useSocket } from '@/context/SocketContext';
import Swal from 'sweetalert2';

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
  const inputRef = useRef(null);
  const Swal = require('sweetalert2');

  const [isLoading, setIsLoading] = useState(false);

  const { subscribe } = useSocket();
  const handleTopic = HandleTopic(dispatch);
  const handleQueue = HandleQueue(dispatch);

  // 1. 방 정보 설정 상태
  const [step, setStep] = useState(0);
  const [selectedMode, setMode] = useState(gameinfo.mode);
  const [selectedGame, setGame] = useState(gameinfo.name);
  const [title, setTitle] = useState(gameinfo.name);

  // 방제목 설정하기
  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 12) {
      Swal.fire({
        icon: 'warning',
        title: '12자 이내로 입력해주세요!',
      });
      setTitle(title.slice(0, 12));
    } else {
      setTitle(e.target.value);
      dispatch(setNameAction(e.target.value));
    }
  };

  // 커서 마지막으로 이동
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const element = e.target;
    element.selectionStart = element.value.length;
  };

  useEffect(() => inputRef.current.focus(), []);

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
        Swal.fire({
          icon: 'question',
          title: '게임을 선택하세요!',
        });
        return;
      }
      if (selectedMode === '') {
        Swal.fire({
          icon: 'question',
          title: '모드를 선택하세요!',
        });
        return;
      }
    }
    setStep((num: number) => (num % 2) + 1);
  };

  // 라운드 세팅 추가하기
  const handleClickAdd = () => {
    if (gameinfo.settings.length === 3) {
      Swal.fire({
        icon: 'error',
        title: '최대 3라운드까지 가능해요!',
      });
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
    if (checkIsValid()) {
      // setIsLoading(true)
      const res = await makeRoomApi(gameinfo);
      // setIsLoading(false)

      // 방 만들기가 성공했을 때에만 실행
      if (res) {
        // 방의 pin 번호 redux에 저장
        dispatch(setPincodeAction(res.data.id));
        console.log(res.data.id)

        // topic, queue 구독
        const topic = `/topic/room.${res.data.id}`;
        const queue = `/queue/manager.room.${res.data.id}`;
        subscribe(topic, handleTopic);
        subscribe(queue, handleQueue);

        router.push('/ready');
        dispatch(updateStatus());
      }
    }
  };

  // 라운드 정보 유효성 검사
  const checkIsValid = () => {
    return gameinfo.settings.every(setting => {
      if (setting.keyword == '' || setting.hidden == '') {
        Swal.fire({
          icon: 'question',
          title: `Round${setting.round}`,
          text: '키워드와 히든단어를 빠짐없이 입력해주세요!',
        });
      } else if (setting.keyword == setting.hidden) {
        Swal.fire({
          icon: 'warning',
          title: `Round${setting.round}`,
          text: '키워드와 히든단어를 다르게 입력해주세요!',
        });
      } else {
        return true;
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-cover flex flex-col align-middle bg-center justify-center bg-bg-3">
      {isLoading && <Loading />}
      <section className="glass w-[70%] min-h-[90vh] border-2 mx-auto flex my-5">
        <div className="w-[70%] md:w-[80%] lg:w-[70%] gap-3 mx-auto py-8 flex flex-col">
          <div className="w-[50%] mx-auto flex border-b-[2px] border-black">
            <>
              <input
                ref={inputRef}
                onFocus={onFocus}
                value={title}
                onChange={handleInputName}
                placeholder={'12자 이내로 입력해주세요'}
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
                className="bg-white w-[80px] h-[40px] rounded-md mx-auto mt-5 hover:text-white hover:bg-black hover:button-shadow"
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
                    className="bg-white w-[60px] min-h-[35px] rounded-[5px] mx-auto hover:bg-black hover:text-white button-shadow"
                    onClick={handleClickAdd}
                  >
                    추가
                  </button>
                </div>
                <div className="flex justify-center absolute bottom-7 left-[50%] translate-x-[-50%]">
                  <button
                    className="bg-white w-[80px] font-bold h-12 rounded-[5px] mr-3 hover:scale-[1.02] hover:button-shadow"
                    onClick={handleClickStep}
                  >
                    이전
                  </button>
                  <button
                    className="button-black font-bold w-[200px] mx-0 hover:scale-[1.02] hover:button-shadow"
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
