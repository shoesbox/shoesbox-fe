import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../api";

const initialState = {
 tmp:{},
};

const getTmpThunk = createAsyncThunk(
  "/api/friend/tmp",
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

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    tmpReducer: (state, action) => {
      state.images = action.payload;
    //   console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTmpThunk.fulfilled, (state, action) => {
      state.tmp = action.payload;
    });
 
  },
});

export const { tmpReducer } = friendSlice.actions;
export default friendSlice.reducer;
