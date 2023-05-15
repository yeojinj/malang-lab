import { axios, authApi, BASE_URL } from './axios.config';
import { Guest } from '@/store/guestSlice';
import { GameInfo } from '@/store/gameInfoSlice';
import { WordInfo } from '@/store/Types';
import { ReadyInfo } from '@/store/readyInfoSlice';

// 토큰 생성하기
export const getTokenApi = async () => {
  try {
    const res = await axios.post('/token');
    console.log('토큰 받기 성공', res);
    localStorage.setItem('token', res.data.data.token);
    return res.data.data.token;
  } catch (err) {
    console.log('토큰 받기 실패', err);
    return false;
  }
};

// 방 생성하기
export const makeRoomApi = async (payload: GameInfo) => {
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
export const checkPinApi = async (payload: number) => {
  console.log(payload, 'checkPinPayload');
  try {
    const res = await authApi.get(`/game/${payload}`);
    console.log('PIN 번호 확인 완료', res);
    return res.data.data;
  } catch (err) {
    console.log('PIN 번호 확인 실패', err);
    return false;
  }
};

// 닉네임 및 캐릭터 설정하기
export const checkGuestInfoApi = async (payload: Guest) => {
  console.log(payload, 'setGuestInfo');
  const formData: any = new FormData();
  const { pin, nickname, imageUrl, title } = payload;

  formData.append('id', localStorage.getItem('token'));
  formData.append('nickname', nickname);

  function b64toBlob(dataURI: string) {
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

  formData.append(
    'image',
    new File([b64toBlob(imageUrl)], 'capture.png', {
      type: 'image/png',
    }),
  );

  try {
    const res = await authApi.post(`/game/${pin}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return res.data.data.imagePath;
  } catch (err) {
    console.log('닉네임 및 캐릭터 설정 실패', err);
    if (err.response.data.status == 400) {
      alert(err.response.data.message);
    }
  }
};

// 참여자 입장
export const joinGuestApi = async payload => {
  console.log(payload, 'joinGuestPayload');
  const { pin, nickname, imagePath } = payload;
  console.log(pin, nickname, imagePath, '💫')
  const token = localStorage.getItem('token');
  try {
    const res = await authApi.post(`/room.${pin}`, {
      type: 'JOIN',
      body: {
        id: token,
        nickname,
        imagePath,
      },
    });
    console.log(res.data);
    return res;
  } catch (err) {
    console.log('게스트 참여 실패', err);
    return false
  }
};

// 게임 / 라운드 시작
export const gameStartApi = async (pin: number) => {
  console.log(pin);
  try {
    const res = await authApi.post(`/game/${pin}/start`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log('게임 시작 실패', err);
  }
};

// 키워드 입력
export const inputWordApi = async (payload: WordInfo) => {
  console.log(payload, 'postWord');
  const { word, time, roomId } = payload;
  try {
    const res = await authApi.post(`/game/${roomId}/word`, payload);
    return res.data;
  } catch (err) {
    console.log('단어 입력 실패', err);
  }
};

// 참여자 퇴장
export const guestOutApi = async (payload: string) => {
  console.log(payload, 'pin!!!!!!!!!!');

  // 닉네임이 존재하는 사용자 일 경우에만 새로고침 할 수 있도록
  if (payload) {
    const token = localStorage.getItem('token');
    // 나가기
    navigator.sendBeacon(`${BASE_URL}/game/${payload}/user/out`, token);
    // 토큰 삭제
    localStorage.removeItem('token');
  }
};

// 호스트 퇴장하기
export const hostOutApi = async (payload: string) => {
  console.log(payload, '호스트 퇴장!!!!!!!!!!');

  const token = localStorage.getItem('token');
  console.log(token, '나가는 호스트의 토큰,,,');
  // 나가기
  navigator.sendBeacon(`${BASE_URL}/game/${payload}/destroy`, token);
  // 토큰 삭제
  localStorage.removeItem('token');
};

// 단어 입력 수 결과 받아오기
export const wordsNumApi = async (pin: string) => {
  try {
    const res = await authApi.get(`/game/${pin}/wordcount`);
    return res.data.data;
  } catch (err) {
    console.log('단어 입력 수 가져오기 실패', err);
  }
};

// 워드 클라우드 결과 받아오기
export const wordcloudApi = async (pin: number) => {
  try {
    const res = await authApi.get(`/game/${pin}/wordcloud`);
    return res.data.data;
  } catch (err) {
    console.log('워드 클라우드 단어 가져오기 실패', err);
  }
};

// 히든 단어 맞춘 사람 결과 받아오기
export const hiddenWordApi = async (pin: number) => {
  try {
    const res = await authApi.get(`/game/${pin}/hiddenword`);
    console.log(res.data);
    return res.data.data;
  } catch (err) {
    console.log('히든 단어 사람 가져오기 실패', err);
  }
};

export default {
  getTokenApi,
  makeRoomApi,
  checkPinApi,
  checkGuestInfoApi,
  gameStartApi,
  inputWordApi,
  wordsNumApi,
  guestOutApi,
  hostOutApi,
  wordcloudApi,
  hiddenWordApi,
  joinGuestApi,
};
