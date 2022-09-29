import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  alarmList: [],
  loading: false,
};

const loginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.value = action.payload;
    },
    switchLoadingAlarm: (state, action) => {
      state.loading = action.payload;
    },
    setAlarmList: (state, action) => {
      // state.alarmList = action.payload;
      // console.log(action.payload);
      const alarmList = action.payload;
      let newList = alarmList.map((a) => {
        let msg = '';
        if (a.messageType === 'COMMENT') {
          msg = `${a.senderMemberNickname}님이 ${a.month}/${a.day} 일기에 답글을 남기셨어요.`;
        } else if (a.messageType === 'POST') {
          msg = `${a.senderMemberNickname}님이 ${a.month}/${a.day} 일기를 작성하셨습니다!`;
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
      state.loading = false;
    },
    deleteAlarm: (state, action) => {
      // console.log(action.payload);
      const alarmId = action.payload;
      const alarmList = state.alarmList;
      const newList = alarmList.filter((a) => {
        return parseInt(a.alarmId) !== alarmId;
      });
      state.alarmList = newList;
    },
    deleteAllAlarms: (state, action) => {
      state.alarmList = [];
    },
  },
});

export const {
  setIsLogin,
  setAlarmList,
  switchLoadingAlarm,
  deleteAlarm,
  deleteAllAlarms,
} = loginSlice.actions;
export default loginSlice.reducer;
