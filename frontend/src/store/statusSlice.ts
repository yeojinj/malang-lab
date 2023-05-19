import { createSlice } from '@reduxjs/toolkit';
import { State } from 'howler';

type Status = {
  isHost: boolean;
  done: boolean;
};

const initialState: Status = {
  isHost: false,
  done : false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    // 방 만들기 버튼을 눌렀을 때 상태 갱신
    updateStatus: (state) => {
      state.isHost = true;
    },
    updateDoneStatus: (state) =>  {
      state.done = true;
    }
  },
});

export const { updateStatus, updateDoneStatus } = statusSlice.actions;
export default statusSlice.reducer;
