import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../api';
import axios from 'axios';

const initialState = {
  prev: [],
  this: [],
  next: [],
};

export const getCalenderThunk = createAsyncThunk('/api/calender', async () => {
  const response = await axios.get('http://localhost:5001/data');
  return response.content;
});

const calenderSlice = createSlice({
  name: 'calender',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCalenderThunk.fulfilled, (state, action) => {
      state.prev = action.payload;
    });
  },
});

export default calenderSlice.reducer;
