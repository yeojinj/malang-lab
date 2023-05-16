import { createSlice } from '@reduxjs/toolkit';

export interface Guest {
  pin: string;
  nickname: string;
  imageUrl: string;
  title: string;
};

const initialState: Guest = {
  pin: '',
  nickname: '',
  imageUrl: '',
  title: '',
};

export const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    // pin setting
    setPinAction(state, action) {
      state.pin = action.payload;
    },
    // image setting
    setImageAction(state, action) {
      state.imageUrl = action.payload;
    },
    // nickname setting
    setNicknameAction(state, action) {
      state.nickname = action.payload;
    },
    // title setting
    setTitleAction(state, action) {
      state.title = action.payload;
    },
  },
});

export const {
  setPinAction,
  setNicknameAction,
  setImageAction,
  setTitleAction,
} = guestSlice.actions;
export default guestSlice.reducer;
