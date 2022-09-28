import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../api';
import axios from 'axios';

const initialState = {
  prev: [],
  this: [],
  next: [],
  userInfo: {},
};

export const getCalenderThunk = createAsyncThunk('/api/calender', async () => {
  const response = await axios.get('http://localhost:5001/data');
  return response.content;
});

export const getUserThunk = createAsyncThunk(
  '/api/posts/detail',
  async (code) => {
    const res = await apis.loginGoogle(code);
    window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
    return res.data.data;
});

const calenderSlice = createSlice({
  name: 'calender',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCalenderThunk.fulfilled, (state, action) => {
      state.prev = action.payload;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export default calenderSlice.reducer;
