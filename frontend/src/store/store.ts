'use client';

import { configureStore } from '@reduxjs/toolkit';

import roundSlice from './roundSlice';

// redux 생성 함수
const store = configureStore({
  reducer: {
    round: roundSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;