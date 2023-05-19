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
      let tmp = action.payload.map((item: ReadyInfo) => {
        return {
          nickname: item.nickname,
          imagePath: item.imagePath,
        };
      });
      return tmp;
    },
    // 대기자 목록에 게스트 추가
    setReadyMember(state, action) {
      state.push(action.payload);
    },
    // 퇴장한 게스트 반영
    guestOutAction(state, action) {
      console.log(action.payload);
      return state.filter(user => user.nickname !== action.payload);
    },
  },
});

export const { setReadyMember, guestOutAction, setPreMembers } = readyInfoSlice.actions;
export default readyInfoSlice.reducer;
