'use client';

import { useState } from 'react';
// redux
import { setPinAction, setTitleAction } from '@/store/guestSlice';
import { useDispatch } from 'react-redux';
// apis
import { checkPinApi } from '@/apis/apis';
import { useSocket } from '@/context/SocketContext';
// socket
import { HandleQueue } from '@/libs/handleQueue';
import { HandleTopic } from '@/libs/handleTopic';
import { HandleQueueList } from '@/libs/handleQueueList';
// alert
import Swal from 'sweetalert2';

type Props = {
  setStep: (step: number) => void;
};

export default function PinForm({ setStep }: Props) {
  const dispatch = useDispatch();
  const { subscribe } = useSocket();
  const handleTopic = HandleTopic(dispatch);
  const handleQueue = HandleQueue(dispatch);
  const handleQueueList = HandleQueueList(dispatch);
  const [pin, setPin] = useState<string>('');

  // pin 번호 입력
  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClickComplete();
  };

  const handleClickComplete = async () => {
    // pin번호가 입력되지 않았을 경우
    if (!pin?.trim()) {
      Swal.fire('PIN 번호를 입력해주세요!', '', 'question');
      return;
    }

    // 유효한 세션인지 확인 한후
    const data = await checkPinApi(Number(pin));
    if (data) {
      const token = localStorage.getItem('token');
      // topic, queue 구독
      const topic = `/topic/room.${pin}`;
      const queue = `/queue/room.${pin}`;
      console.log(`/queue/${token}`);
      const queueList = `/queue/${token}`;
      subscribe(topic, handleTopic);
      subscribe(queue, handleQueue);
      subscribe(queueList, handleQueueList);

      // pin번호 redux에 저장
      dispatch(setPinAction(pin));
      // 게임 이름 redux에 저장
      dispatch(setTitleAction(data.name));
      // 해당 방의 대기자 목록 redux에 저장
      // dispatch

      // 다음 페이지로 이동
      setStep(1);
    } else {
      Swal.fire({
        icon: 'error',
        title: '유효한 PIN 번호가 아닙니다!',
      });
    }
  };

  return (
    <section className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col justify-center align-middle gap-5">
      <p className="text-center text-4xl sm:text-5xl font-bold mb-5">
        참여하기
      </p>
      <input
        type="number"
        placeholder="PIN 번호"
        onChange={handleChangePin}
        onKeyPress={handleKeyPress}
        className="block w-[80%] sm:w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
      />
      <button
        className="button-black w-[80%] sm:w-[60%]"
        onClick={handleClickComplete}
      >
        참여하기
      </button>
    </section>
  );
}
