import { axios, authApi } from './axios.config';
import { Guest } from './../store/guestSlice';
import { GameInfo, Setting } from '@/store/gameInfoSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// 토큰 생성하기
const getTokenApi = () => {
  return axios
    .post('/token')
    .then(res => {
      console.log('토큰 받기 성공', res);
      localStorage.setItem('token', res.data.data.token);
      return res.data.data.token;
    })
    .catch(err => {
      console.log('토큰 받기 실패', err);
      return false;
    });
};

// 방 생성하기
const makeRoomApi = async (payload: GameInfo) => {
  console.log(payload, 'makeRoomPayload');
  try {
    const res = await authApi.post('/game', payload);
    console.log('방 만들기 성공', res);
    return res.data;
  } catch (err) {
    console.log('방 만들기 실패', err);
    return false;
  }
};

// PIN 번호 확인하기
const checkPinApi = async (payload: number) => {
  console.log(payload, 'checkPinPayload');
  try {
    const res = await authApi.get(`/game/${payload}`);
    console.log('PIN 번호 확인 완료', res);
    return res;
  } catch (err) {
    console.log('PIN 번호 확인 실패', err);
    return false;
  }
};

// 닉네임 및 캐릭터 설정하기
const setGuestInfo = async (payload: Guest) => {
  console.log(payload, 'setGuestInfo');
  const formData: any = new FormData();
  const { pin, nickname, imageUrl } = payload;
  formData.append('id', localStorage.getItem('token'));
  formData.append('nickname', nickname);
  formData.append('image', imageUrl);

  for (let key of formData.keys()) {
    console.log(key, formData.get(key), '👩');
  }

  try {
    const res = await authApi.post(`/game/${pin}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (err) {
    console.log('닉네임 및 캐릭터 설정 실패', err);
  }
};

export { getTokenApi, makeRoomApi, checkPinApi, setGuestInfo };
