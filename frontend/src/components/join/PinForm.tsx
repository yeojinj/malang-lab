import { checkPinApi } from '@/apis/apis';
import { useSocket } from '@/context/SocketContext';
import { HandleQueue } from '@/libs/handleQueue';
import { HandleTopic } from '@/libs/handleTopic';
import { setPinAction } from '@/store/guestSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  setStep: (step: number) => void;
};

export default function PinForm({ setStep }: Props) {
  const [pin, setPin] = useState('');
  const { client, subscribe, publish } = useSocket();
  const dispatch = useDispatch();
  const handleTopic = HandleTopic(dispatch);
  // step2 - 닉네임 입력하기
  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleClickPin = async () => {
    if (!pin?.trim()) {
      alert('PIN 번호를 입력해주세요!');
      return;
    }

    // 유효한 세션인지 확인 한후
    const isValid = await checkPinApi(Number(pin));
    if (isValid) {
      // topic, queue 구독
      const topic = `/topic/room.${pin}`;
      const queue = `/queue/room.${pin}`;
      subscribe(topic, handleTopic);
      subscribe(queue, HandleQueue);

      // 리덕스에 저장
      dispatch(setPinAction(pin));

      // 다음 페이지로 이동
      setStep(1);
    } else {
      alert('유효한 PIN 번호가 아닙니다!');
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
        className="block w-[80%] sm:w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
      />
      <button
        className="button-black w-[80%] sm:w-[60%]"
        onClick={handleClickPin}
      >
        참여하기
      </button>
    </section>
  );
}
