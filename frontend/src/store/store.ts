'use client';

import { configureStore } from '@reduxjs/toolkit';

import gameInfoSlice from './gameInfoSlice';
import guestSlice from './guestSlice';

// redux 생성 함수
const store = configureStore({
  reducer: {
    gameinfo: gameInfoSlice,
    guest : guestSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;