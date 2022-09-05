import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../api/api";
import axios from "axios";

const initialState = {
  post: {},
  commentList: [],
  userInfo: [],
};

export const getDetailThunk = createAsyncThunk(
  "/api/posts/detail",
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

export const getJsonDetailThunk = createAsyncThunk(
  "api/posts/detail/json",
  async (postId, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://localhost:3030/posts/?postId=${postId}`
      );
      //   console.log('thunk', data.data[0]);
      return data.data[0];
    } catch (err) {
      return thunkAPI.rejectWithValue("getDetailThunkErr", err.response.data);
    }
  }
  //   async (postId, thunkAPI) => {
  //     try {
  //       axios
  //         .get(`http://localhost:3030/posts/?postId=${postId}`)
  //         .then(
  //             (data) => console.log("thunkSide", data.data[0]));
  //     } catch (err) {
  //       return thunkAPI.rejectWithValue("thunkErr", err.response);
  //     }
  //   }
);

export const getJsonCommentThunk = createAsyncThunk(
  "api/posts/comment/json",
  async (postId, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://localhost:3030/comments/?postId=${postId}`
      );
    //   console.log("thunk", data.data);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("getCommentThunkErr", err.response.data);
    }
  }
);

export const postJsonDetailThunk = createAsyncThunk(
    "api/posts/detail/json/write",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.post(
          `http://localhost:3030/posts`, {
            // id : new Date(),
            // postId : Math.round((Math.random() * 99) + 1),
            nickname : payload.nickname,
            // images : payload.images,
            content : payload.content,
       
          }
        );
        console.log("thunk", data.data);
        // return data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("postJsonThunkErr", err.response.data);
      }
    }
  );

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    loadPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailThunk.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(getJsonDetailThunk.fulfilled, (state, action) => {
      // console.log('extraReducers', action.payload);
      state.post = action.payload;
    });
    builder.addCase(getJsonCommentThunk.fulfilled, (state, action)=>{
      // console.log('extraReducers', action.payload);
      state.commentList = action.payload;
    })
  },
});

export const { loadPost } = detailSlice.actions;
export default detailSlice.reducer;
