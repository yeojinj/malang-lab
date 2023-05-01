'use client';

import { configureStore } from '@reduxjs/toolkit';

import gameInfoSlice from './gameInfoSlice';

// redux 생성 함수
const store = configureStore({
  reducer: {
    gameinfo: gameInfoSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;