import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../api/api";
import axios from "axios";

const initialState = {
 images:[],
};

const getTmpThunk = createAsyncThunk(
  "/api/write/tmp",
  async (postId, thunkAPI) => {
    try {
      const data = await apis.getDetail(postId);
      const postDetail = data.data.data;
      // console.log('thunk',data.data.data)
      return postDetail;
    } catch (err) {
      return thunkAPI.rejectWithValue("getDetailThunkErr", err.response.data);
    }
  }
);


const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    saveImages: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTmpThunk.fulfilled, (state, action) => {
      state.post = action.payload;
    });
 
  },
});

export const { saveImages } = writeSlice.actions;
export default writeSlice.reducer;
