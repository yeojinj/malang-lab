import { createSlice } from '@reduxjs/toolkit';

type Num = {
  num: number;
  total: number;
};

const initialState: Num = {
  num: 0,
  total: 0,
};

export const wordNumSlice = createSlice({
  name: 'wordNum',
  initialState,
  reducers: {
    // CHECK_DB 신호 올 때마다 상태 갱신
    setWordAction(state, action) {
      console.log(action.payload, 'wordnum')
      state.num = action.payload;
    },
    // 라운드 끝나면 totalnum 업데이트
    setTotalAction(state, action) {
      state.total += action.payload;
    },
    // 라운드 끝나면 wordnum 초기화
    wordZeroAction(state) {
      state.num = 0;
    },
  },
});

export const { setWordAction, wordZeroAction, setTotalAction } =
  wordNumSlice.actions;
export default wordNumSlice.reducer;
