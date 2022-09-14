import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../api';

const initialState = {
  tmp: {},
  errorMsg: '',
  friendList: [],
  requestFriendList: [],
};

export const getFriendListThunk = createAsyncThunk(
  '/api/getfriendlistthunk',
  async (thunkAPI) => {
    try {
      const data = await apis.getFriendList();
      const res = data.data.data;
      // console.log('getFriendListthunk', data.data.data);
      return res;
    } catch (err) {
      console.log(
        thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data)
      );
      // return thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data);
    }
  }
);

export const getRequestFriendListThunk = createAsyncThunk(
  '/api/getrequestfriendthunk',
  async (thunkAPI) => {
    try {
      const data = await apis.getRequestFriendList();
      const res = data.data.data;
      // console.log('getRequestFriendthunk', data.data.data);
      return res;
    } catch (err) {
      console.log(
        thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data)
      );
      // return thunkAPI.rejectWithValue('getRequestFriendThunkErr', err.response.data);
    }
  }
);

// error만 alert, return value로 extrareducer에서 관리 안함
export const addFriendThunk = createAsyncThunk(
  '/api/addfriendthunk',
  async (email, thunkAPI) => {
    try {
      const data = await apis.addFriend({
        email,
      });
      alert('친구 신청이 완료되었습니다.');
      // const res = data.data.data;
      // console.log('addFriendthunk', `email: ${email}`, data.data.data);
      // return res;
    } catch (err) {
      // console.log(
      //   thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data)
      // );
      alert(err.response.data.errorDetails.apierror.message);
      // return thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data);
    }
  }
);

export const acceptFriendThunk = createAsyncThunk(
  '/api/acceptfriendthunk',
  async (memberId, thunkAPI) => {
    try {
      const data = await apis.acceptFriend(memberId);
      const res = data.data.data;
      // console.log(res);
      const acceptFriend = res.fromMemberNickname;
      alert(`${acceptFriend}님의 요청을 수락하였습니다.`);
      // console.log('acceptFriendthunk', data.data.data);
      return res;
    } catch (err) {
      // console.log(thunkAPI.rejectWithValue('acceptFriendThunkErr', err.response.data))
      alert(err.response.data.errorDetails.apierror.message);
      // return thunkAPI.rejectWithValue('acceptFriendThunkErr', err.response.data);
    }
  }
);

export const refuseFriendThunk = createAsyncThunk(
  '/api/refusefriendthunk',
  async (memberId, thunkAPI) => {
    try {
      const data = await apis.refuseFriend(memberId);
      const res = data.data.data;
      // console.log('refuseFriendthunk', res.memberNickname);
      const refuseFriend = res.fromMemberNickname;
      alert(`${refuseFriend}님의 요청을 거절하였습니다.`);
      return memberId;
    } catch (err) {
      // console.log(thunkAPI.rejectWithValue('refuseFriendThunkErr', err.response.data))
      alert(err.response.data.errorDetails.apierror.message);
      // return thunkAPI.rejectWithValue('refuseFriendThunkErr', err.response.data);
    }
  }
);

export const delFriendThunk = createAsyncThunk(
  '/api/delfriendthunk',
  async (memberId, thunkAPI) => {
    try {
      const data = await apis.deleteFriend(memberId);
      const res = data.data.data;
      console.log('delFriendthunk', res);
      const delFriend = res.memberNickname;
      alert(`${delFriend}님을 친구 목록에서 삭제하였습니다.`);
      return memberId;
    } catch (err) {
      // console.log(thunkAPI.rejectWithValue('delFriendThunkErr', err.response.data))
      alert(err.response.data.errorDetails.apierror.message);
      // return thunkAPI.rejectWithValue('delFriendThunkErr', err.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    tmpReducer: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRequestFriendListThunk.fulfilled, (state, action) => {
      state.requestFriendList = action.payload;
    });
    builder.addCase(getFriendListThunk.fulfilled, (state, action) => {
      state.friendList = action.payload;
    });
    builder.addCase(acceptFriendThunk.fulfilled, (state, action) => {
      // friendList에 추가, requestFreindList 에서 제거
      const newFriend = {
        memberId: action.payload.fromMemberId,
        memberNickname: action.payload.fromMemberNickname,
      };
      state.friendList = [...state.friendList, newFriend];
      const requestFriendList = state.requestFriendList;
      const requestMemberId = action.payload.fromMemberId;
      const newRqFriendList = requestFriendList.filter((l) => {
        return parseInt(l.memberId) !== requestMemberId;
      });
      state.requestFriendList = newRqFriendList;
    });
    builder.addCase(refuseFriendThunk.fulfilled, (state, action) => {
      const requestFriendList = state.requestFriendList;
      const requestMemberId = action.payload;
      const newRqFriendList = requestFriendList.filter((l) => {
        return parseInt(l.memberId) !== requestMemberId;
      });
      state.requestFriendList = newRqFriendList;
    });
    builder.addCase(delFriendThunk.fulfilled, (state, action) => {
      const friendList = state.friendList;
      const memberId = action.payload;
      const newFriendList = friendList.filter((l) => {
        return parseInt(l.memberId) !== memberId;
      });
      state.friendList = newFriendList;
    });
  },
});

export const { tmpReducer } = friendSlice.actions;
export default friendSlice.reducer;
