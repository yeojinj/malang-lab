'use client';

import { createSlice, current } from '@reduxjs/toolkit';

export interface Setting {
  id: string;
  keyword: string;
  hidden: string;
  time: number;
  round: number;
}

export type GameInfo = {
  id : number;
  title : string;
  name: string;
  mode: string;
  settings: Setting[];
};

const initialState: GameInfo = {
  id : 0,
  title:'말랑이의 연구소',
  name: '',
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
};

export const gameInfoSlice = createSlice({
  name: 'gameinfo',
  initialState,
  reducers: {
    // pin 번호
    setPincodeAction(state, action) {
      state.id = action.payload
    },
    // 방 제목 입력
    setTitleAction(state, action) {
      state.title = action.payload
    },
    // 모드 선택하기
    modeAction(state, action) {
      state.mode = action.payload;
    },
    // 게임 선택하기
    gameAction(state, action) {
      state.name = action.payload;
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
      state.settings.map((setting, idx)=> {
        setting.round = idx+1
      })
    },
    // 추가 버튼을 눌렀을때
    addRoundAction(state) {
      state.settings.push({
        id: null,
        keyword: '',
        hidden: '',
        time: 30,
        round: state.settings.length+1,
      });
    }
  },
});

// Action & Slice export
export const {
  setPincodeAction,
  setTitleAction,
  addRoundAction,
  modeAction,
  gameAction,
  deleteRoundAction,
  changekeywordAction,
  changeHiddenAction,
  changeTimeAction,
} = gameInfoSlice.actions;
export default gameInfoSlice.reducer;
