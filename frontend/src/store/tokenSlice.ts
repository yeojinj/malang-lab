import { createSlice } from '@reduxjs/toolkit';

type Token = {
  id: string;
};

const initialState: Token = {
  id: null,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // 토큰 불러올 때 토큰값 업데이트
    updateToken: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;
