import { createSlice } from '@reduxjs/toolkit';

type Num = {
  num: number;
};

const initialState: Num = {
  num: 0,
};

export const wordNumSlice = createSlice({
  name: 'wordNum',
  initialState,
  reducers: {
    // CHECK_DB 신호 올 때마다 상태 갱신
    setWordAction(state, action) {
      state.num = action.payload;
    },
    // 라운드 끝나면 wordnum 초기화
    wordZeroAction(state) {
      state.num = 0;
    },
  },
});

export const { setWordAction, wordZeroAction } = wordNumSlice.actions;
export default wordNumSlice.reducer;
