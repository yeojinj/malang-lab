import { createSlice } from '@reduxjs/toolkit';

type Status = {
  isHost: boolean;
};

const initialState: Status = {
  isHost: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    // 방 만들기 버튼을 눌렀을 때 상태 갱신
    updateStatus: (state) => {
      state.isHost = true;
    }
  },
});

export const { updateStatus } = statusSlice.actions;
export default statusSlice.reducer;
