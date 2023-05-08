'use client';

import { createSlice, current } from '@reduxjs/toolkit';

export interface Setting {
  id: string;
  keyword: string;
  hidden: string;
  time: number;
  round: number;
}

type GameInfo = {
  name: string;
  mode: string;
  settings: Setting[];
};

const initialState: GameInfo = {
  name: '',
  mode: '',
  settings: [
    {
      id: '',
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
    modeAction(state, action) {
      state.mode = action.payload;
    },
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
    },

    // 추가 버튼을 눌렀을때
    addRoundAction(state) {
      state.settings.push({
        id: '',
        keyword: '',
        hidden: '',
        time: 30,
        round: state.settings.length + 1,
      });
    },
  },
});

// Action & Slice export
export const {
  addRoundAction,
  modeAction,
  gameAction,
  deleteRoundAction,
  changekeywordAction,
  changeHiddenAction,
  changeTimeAction,
} = gameInfoSlice.actions;
export default gameInfoSlice.reducer;
