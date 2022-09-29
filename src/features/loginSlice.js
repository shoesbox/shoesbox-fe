import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  alarmList: [],
};

const loginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.value = action.payload;
    },
    setAlarmList: (state, action) => {
      // state.alarmList = action.payload;
      console.log(action.payload);
      const alarmList = action.payload;
      let newList = alarmList.map((a) => {
        let msg = '';
        if (a.messageType === 'COMMENT') {
          msg = `${a.sendMemberNickname}님이 ${a.month}/${a.day} 일기에 답글을 남기셨어요.`;
        } else if (a.messageType === 'POST') {
          msg = `${a.sendMemberNickname}님이 ${a.month}/${a.day} 일기를 작성하셨습니다!`;
        }
        return Object.assign(
          {},
          { alarmId: a.alarmId },
          {
            postId: a.postId,
            text: msg,
          }
        );
      });
      // console.log(newList);
      state.alarmList = newList;
    },
  },
});

export const { setIsLogin, setAlarmList } = loginSlice.actions;
export default loginSlice.reducer;
