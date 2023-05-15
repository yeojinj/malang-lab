import { createSlice } from '@reduxjs/toolkit';

export type word = {
  text: string;
  value: number;
};

export type ResultInfo = {
  wordcloudData: word[];
};

const initialState: ResultInfo = {
  wordcloudData: [{ text: 'text', value: 1 }],
};

export const resultInfoSlice = createSlice({
  name: 'resultInfo',
  initialState,
  reducers: {
    setWordcloudData(state, action) {
      state.wordcloudData = action.payload;
    },
  },
});

export const { setWordcloudData } = resultInfoSlice.actions;
export default resultInfoSlice.reducer;
