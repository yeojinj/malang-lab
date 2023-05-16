import { createSlice, current } from '@reduxjs/toolkit';

export interface ReadyInfo {
  nickname: string;
  imagePath: string;
};

const initialState: ReadyInfo[] = [];

export const readyInfoSlice = createSlice({
  name: 'readyInfo',
  initialState,
  reducers: {
    setPreMembers(state, action) {
      console.log(action.payload)
      let tmp = action.payload.map((item: ReadyInfo) => {
        return {
          nickname: item.nickname,
          imagePath: item.imagePath,
        };
      });
      console.log(tmp, '💝')
      return tmp;
    },
    // 대기자 목록에 게스트 추가
    setReadyMember(state, action) {
      state.push(action.payload);
      console.log(state, '대기자 목록 추가');
    },
    // 퇴장한 게스트 반영
    guestOutAction(state, action) {
      console.log(action.payload);
      console.log(current(state), '퇴장전 리스트');
      return state.filter(user => user.nickname !== action.payload);
    },
  },
});

export const { setReadyMember, guestOutAction, setPreMembers } = readyInfoSlice.actions;
export default readyInfoSlice.reducer;
