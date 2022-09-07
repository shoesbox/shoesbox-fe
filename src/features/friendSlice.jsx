import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../api';

const initialState = {
  tmp: {},
  friendList : [],
  requestFriendList: [],
};

export const getRequestFriendListThunk = createAsyncThunk(
  '/api/getrequestfriendthunk',
  async (thunkAPI) => {
    try {
      const data = await apis.getRequestFriendList();
      const res = data.data.data;
      console.log('getRequestFriendthunk',data.data.data)
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue('getRequestFriendThunkErr', err.response.data);
    }
  }
);

export const addFriendThunk = createAsyncThunk(
  '/api/addfriendthunk',
  async (email, thunkAPI) => {
    try {
      const data = await apis.addFriend({
        email
      });
      const res = data.data.data;
      // console.log('addFriendthunk',data.data.data)
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue('addFriendThunkErr', err.response.data);
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
    builder.addCase(addFriendThunk.fulfilled, (state, action) => {
      // state.tmp = action.payload;
    });
    
  },
});

export const { tmpReducer } = friendSlice.actions;
export default friendSlice.reducer;
