import { createSlice } from '@reduxjs/toolkit';

export type RoundInfo = {
  keyword: string;
  timeLimit: number;
  round: number;
  isLast: boolean;
};

const initialState: RoundInfo = {
  keyword: '',
  timeLimit: 0,
  round: 0,
  isLast: false,
};

export const roundInfoSlice = createSlice({
  name: 'roundInfo',
  initialState,
  reducers: {
    // pin setting
    setRoundInfo(state, action) {
      state.keyword = action.payload.keyword;
      state.timeLimit = action.payload.timeLimit;
      state.round = action.payload.round;
      state.isLast = action.payload.isLast;
    },
  },
});

export const { setRoundInfo } = roundInfoSlice.actions;
export default roundInfoSlice.reducer;
