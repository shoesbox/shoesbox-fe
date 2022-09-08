import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../api';

const initialState = {
  tmp: {},
  errorMsg : '',
  friendList : [],
  requestFriendList: [],
};

export const getFriendListThunk = createAsyncThunk(
  '/api/getfriendlistthunk',
  async (fromMemberId, thunkAPI) => {
    try {
      const data = await apis.getFriendList();
      const res = data.data.data;
      console.log('getFriendListthunk', data.data.data)
      return res;
    } catch (err) {
      console.log(thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data))
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
      console.log('getRequestFriendthunk',data.data.data)
      return res;
    } catch (err) {
      console.log(thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data))
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
        email
      });
      // const res = data.data.data;
      // console.log('addFriendthunk',`email: ${email}`,data.data.data)
      // return res;
    } catch (err) {
      // console.log(thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data))
      alert(err.response.data.errorDetails.apierror.message);
      // return thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data);
    }
  }
);

export const acceptFriendThunk = createAsyncThunk(
  '/api/acceptriendthunk',
  async (fromMemberId, thunkAPI) => {
    try {
      const data = await apis.acceptFriend(fromMemberId);
      const res = data.data.data;
      // console.log('acceptFriendthunk', data.data.data);
      return res;
    } catch (err) {
      // console.log(thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data))
      alert(err.response.data.errorDetails.apierror.message);
      // return thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    tmpReducer: (state, action) => {
      state.images = action.payload;
      //   console.log(action.payload);
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
      state.friendList = [...state.friendList, action.payload];
      const requestFriendList = state.requestFriendList;
      const requestMemberId = action.payload.fromMemberId;
      const newRqFriendList = requestFriendList.filter((l) => {
        return parseInt(l.fromMemberId) !== requestMemberId;
      });
      state.requestFriendList = newRqFriendList;
    });
   
    
  },
});

export const { tmpReducer } = friendSlice.actions;
export default friendSlice.reducer;
