import { Guest } from './../store/guestSlice';
import axios from 'axios';
import { GameInfo, Setting } from '@/store/gameInfoSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// axios.config
const BASE_URL = 'https://api.malang-lab.com';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(
  request => {
    const ACCESS_TOKEN = localStorage.getItem('token');
    request.headers.Authorization = ACCESS_TOKEN || null;
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// 토큰 생성하기
const getTokenApi = () => {
  return axios
    .post('/token')
    .then(res => {
      console.log('토큰 받기 성공', res);
      localStorage.setItem('token', res.data.data.token);
      return res.data;
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

  formData.append('id', localStorage.getItem('token'))
  formData.append('nickname', nickname)

  function b64toBlob(dataURI) {
    // 인코딩된 문자열 데이터를 디코딩
    var byteString = atob(dataURI.split(',')[1]);
    // ArrayBuffer는 자바스크립트에서 구현된 버퍼, 고정된 크기의 메모리 공간에 바이너리 데이터를 저장하는 객체
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

  formData.append('image', new File([b64toBlob(imageUrl)], "capture.png", {
    type: 'image/png'
}));

  for (let key of formData.keys()) {
    console.log(key, formData.get(key), "👩");
  }

  try {
    const res = await authApi.post(`/game/${pin}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res)
    return res;
  } catch (err) {
    console.log('닉네임 및 캐릭터 설정 실패', err);
  }
};

export { getTokenApi, makeRoomApi, checkPinApi, setGuestInfo };
