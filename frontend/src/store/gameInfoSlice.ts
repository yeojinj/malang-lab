'use client';

import { createSlice, current } from '@reduxjs/toolkit';

export interface Setting {
  id: string;
  keyword: string;
  hidden: string;
  time: number;
  round: number;
}

export interface GameInfo {
  id: number;
  name: string;
  game: string;
  mode: string;
  settings: Setting[];
  present: number;
};

const initialState: GameInfo = {
  id: 0,
  name: '말랑이의 연구소',
  game: '',
  mode: '',
  settings: [
    {
      id: null,
      keyword: '',
      hidden: '',
      time: 30,
      round: 1,
    },
  ],
  present: 0,
};

export const gameInfoSlice = createSlice({
  name: 'gameinfo',
  initialState,
  reducers: {
    // pin 번호
    setPincodeAction(state, action) {
      state.id = action.payload;
      console.log(state.id)
    },
    // 방 제목 입력
    setNameAction(state, action) {
      state.name = action.payload;
    },
    // 모드 선택하기
    modeAction(state, action) {
      state.mode = action.payload;
    },
    // 게임 선택하기
    gameAction(state, action) {
      state.game = action.payload;
    },
    // keyword가 입력 될때
    changekeywordAction(state, action) {
      console.log(action.payload);
      state.settings[action.payload.idx].keyword = action.payload.value;
    },
    // hidden이 입력될 때
    changeHiddenAction(state, action) {
      state.settings[action.payload.idx].hidden = action.payload.value;
    },
    // time이 입력될 때
    changeTimeAction(state, action) {
      state.settings[action.payload.idx].time = action.payload.value;
    },
    // 삭제버튼을 눌렀을 때
    deleteRoundAction(state, action) {
      state.settings.splice(action.payload, 1);
      state.settings.map((setting, idx) => {
        setting.round = idx + 1;
      });
    },
    // 추가 버튼을 눌렀을때
    addRoundAction(state) {
      state.settings.push({
        id: null,
        keyword: '',
        hidden: '',
        time: 30,
        round: state.settings.length + 1,
      });
    },
    // 라운드 시작할 때
    updatePresentAction(state) {
      state.present += 1;
    },
  },
});

// Action & Slice export
export const {
  setPincodeAction,
  setNameAction,
  addRoundAction,
  modeAction,
  gameAction,
  deleteRoundAction,
  changekeywordAction,
  changeHiddenAction,
  changeTimeAction,
  updatePresentAction,
} = gameInfoSlice.actions;
export default gameInfoSlice.reducer;
