import axios from 'axios';
import { GameInfo, Setting } from '@/store/gameInfoSlice';
import { useRouter } from 'next/router';

// axios.config
const BASE_URL = 'https://api.malang-lab.com/';

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
    const res = await authApi
      .post('/game', payload);
    console.log('방 만들기 성공', res);
    return res.data;
  } catch (err) {
    console.log('방 만들기 실패', err);
    return false;
  }
};

// PIN 번호 확인하기
const checkPinApi = async (payload: number) => {
  console.log(payload, 'checkPinPayload')
  try {
    const res = await authApi.get(`/game/${payload}`)
    console.log('PIN 번호 확인 완료', res)
    return res
  } catch (err) {
    console.log('PIN 번호 확인 실패', err)
    return false
  }
}

// 닉네임 및 캐릭터 확인하기

export { getTokenApi, makeRoomApi, checkPinApi };
