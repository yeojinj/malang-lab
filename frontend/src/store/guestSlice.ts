import { createSlice } from '@reduxjs/toolkit';

export type Guest = {
  pin: string;
  nickname: string;
  imageUrl: string;
};

const initialState: Guest = {
  pin: '',
  nickname: '',
  imageUrl: '',
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
      console.log(state.imageUrl, '❤')
    },
    // nickname setting
    setNicknameAction(state, action) {
      state.nickname = action.payload;
    },
  },
});

export const { setPinAction, setNicknameAction, setImageAction } =
  guestSlice.actions;
export default guestSlice.reducer;
