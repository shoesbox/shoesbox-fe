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
  "api/posts/comment/get/json",
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


export const postJsonCommentThunk = createAsyncThunk(
    "api/posts/comment/post/json",
    async ({postId, content}, thunkAPI) => {
      try {
        const data = await axios.post(
          `http://localhost:3030/comments/?postId=${postId}`, {
            //jsondb 특성상 post 시 고유 id 값 필요
                id: new Date(),
                postId: postId,
                nickname: 'Sunny',
                memberId: 3,
                content: content,
                // createdAt: new Date()
          }
        );
        // console.log("thunk", data.data, postId);
        return data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("postCommentThunkErr", err.response.data);
      }
    }
  );

  export const delJsonCommentThunk = createAsyncThunk(
    "api/posts/comment/del/json",
    async ({postId,commentId}, thunkAPI) => {
      try {
        const data = await axios.delete(
          `http://localhost:3030/comments/${commentId}`
        );
        console.log("thunk", data.data, commentId);
        return data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("postCommentThunkErr", err.response.data);
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
    builder.addCase(postJsonCommentThunk.fulfilled, (state, action)=>{
        // console.log('extraReducers', action.payload);
        const newComment = action.payload;
        state.commentList = [...state.commentList, newComment]
    })
    builder.addCase(delJsonCommentThunk.fulfilled, (state, action)=>{
        console.log('extraReducers', action.payload);
        const commentId = action.payload;
        // const newCommentList = state.commentList.filter(
        //    const state.commentList.map((comment, idx)=>{
        //      comment.id
        //    })
        // )
    })
  },
});

export const { loadPost } = detailSlice.actions;
export default detailSlice.reducer;
