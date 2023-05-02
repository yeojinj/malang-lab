'use client';

import { configureStore } from '@reduxjs/toolkit';

import roundSlice from './roundSlice';
import statusSlice from './statusSlice';

// redux 생성 함수
const store = configureStore({
  reducer: {
    round: roundSlice,
    status: statusSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;