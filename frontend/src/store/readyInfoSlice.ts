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
      console.log(action, 'action!!!!!!!!!!!');
      state.push(action.payload);
      console.log(state, 'state!!!!!!!!!!!!!');
    },
  },
});

export const { setReadyMember } = readyInfoSlice.actions;
export default readyInfoSlice.reducer;
