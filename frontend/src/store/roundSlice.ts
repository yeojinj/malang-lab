'use client';

import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import produce, { Draft } from 'immer';

export interface Round {
  topic: string;
  hidden: string;
  seconds: number;
}

const initialState: Round[] = [
  {
    topic: '',
    hidden: '',
    seconds: 0,
  },
];

export const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {
    // 정보가 입력 될때
    // saveAction(state, action) {},

    // 삭제버튼을 눌렀을 때
    // popAction(state, action) {},

    // 추가 버튼을 눌렀을때
    pushAction(state, action: PayloadAction<Round[]>) {
      // // immer를 사용하여 상태를 업데이트합니다.
      // return produce(state, (draftState: Draft<Round[]>) => {
      //   // 새로운 요소를 배열에 추가합니다.
      //   draftState.push({
      //     id: 1,
      //     topic: '',
      //     hidden: '',
      //     seconds: 0,
      //   });
      // });
      return action.payload
    },
  },
});

// Action & Slice export
export const { pushAction } = roundSlice.actions;
export default roundSlice.reducer;
