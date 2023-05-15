import { createSlice } from '@reduxjs/toolkit';

export type word = {
  text: string;
  value: number;
};

export type ResultInfo = {
  wordcloudData: word[];
};

const initialState: ResultInfo = {
  wordcloudData: [],
};

export const resultInfoSlice = createSlice({
  name: 'resultInfo',
  initialState,
  reducers: {
    setWordcloudData(state, action) {
      // action.payload.map((item) => {
      //   state.wordcloudData.push(item)
      // })
      state.wordcloudData = action.payload;
      console.log(state.wordcloudData);
    },
  },
});

export const { setWordcloudData } = resultInfoSlice.actions;
export default resultInfoSlice.reducer;
