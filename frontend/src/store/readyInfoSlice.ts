import { createSlice } from '@reduxjs/toolkit';

export type ReadyInfo = {
  nickname: string;
  imagePath: string;
};

const initialState: ReadyInfo[] = [];

export const readyInfoSlice = createSlice({
  name: 'readyInfo',
  initialState,
  reducers: {
    setReadyMember(state, action) {
      state.push(action.payload);
    },
    outReadyMember(state, action) {

    },
  },
});

export const { setReadyMember, outReadyMember } = readyInfoSlice.actions;
export default readyInfoSlice.reducer;
