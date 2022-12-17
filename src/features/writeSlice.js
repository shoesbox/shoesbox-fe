import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../api';
import axios from 'axios';

const initialState = {
  images: [],
};

export const postDetailThunk = createAsyncThunk(
  '/api/postdetailthunk',
  async (payload, thunkAPI) => {
    try {
      const data = await apis.writeDaily(payload);
      const res = data.data.data;
      // console.log('writeDailythunk',res)
      if (res) {
        window.location.reload();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.errorDetails.apierror.message);
      return thunkAPI.rejectWithValue('writeDailyThunkErr', err.response.data);
    }
  }
);

export const putDetailThunk = createAsyncThunk(
  '/api/postdetailthunk',
  async ({ postId, payload }, thunkAPI) => {
    try {
      const data = await apis.editDetail(postId, payload);
      const res = data.data.data;
      // console.log('writeDailythunk', postId, payload);
      if (res) {
        window.location.reload();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    } catch (err) {
      // console.log(err.response.data);
      alert(err.response.data.errorDetails.apierror.message);
      return thunkAPI.rejectWithValue('writeDailyThunkErr', err.response.data);
    }
  }
);

export const postJsonDetailThunk = createAsyncThunk(
  'api/postJsonDetailThunk',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`http://localhost:3030/posts`, {
        // id : new Date(),
        // postId : Math.round((Math.random() * 99) + 1),
        nickname: payload.nickname,
        // images : payload.images,
        content: payload.content,
      });
      console.log('thunk', data.data);
      // return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('postJsonThunkErr', err.response.data);
    }
  }
);

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    saveImages: (state, action) => {
      state.images = action.payload;
      //   console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postDetailThunk.fulfilled, (state, action) => {
      // state.post = action.payload;
    });
  },
});

export const { saveImages } = writeSlice.actions;
export default writeSlice.reducer;
