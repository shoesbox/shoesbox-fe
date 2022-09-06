import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../api";
import axios from "axios";

const initialState = {
  post: {},
  commentList: [],
  userInfo: [],
  pickedCommentId: null,
};

export const getDetailThunk = createAsyncThunk(
  "/api/posts/detail",
  async (postId, thunkAPI) => {
    try {
      const data = await apis.getDetail(postId);
      const postDetail = data.data.data;
      console.log('showthunk',data.data.data)
      return postDetail;
    } catch (err) {
      return thunkAPI.rejectWithValue("getDetailThunkErr", err.response.data);
    }
  }
);
// jsondb 디테일 페이지 불러오기
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
  // then 으로 불러오는 방법 적용
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
// jsondb comment 불러오기
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
        console.log("thunk", data.data, postId);
        return data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("postCommentThunkErr", err.response.data);

      }
    }
)
  export const delJsonCommentThunk = createAsyncThunk(
    "api/posts/comment/del/json",
    async ({postId,commentId}, thunkAPI) => {
      try {
        const data = await axios.delete(
          `http://localhost:3030/comments/${commentId}`
        );
        // console.log("thunk", data.data, commentId);
        return data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("delCommentThunkErr", err.response.data);
      }
    }
  );

  export const patchJsonCommentThunk = createAsyncThunk(
    "api/posts/comment/patch/json",
    async ({commentId, content}, thunkAPI) => {
      try {
        const data = await axios.patch(
          `http://localhost:3030/comments/${commentId}`,{
              content : content
          }
        );
        console.log("patchJsonCommentThunk", data.data, commentId);
        return data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("patchCommentThunkErr", err.response.data);
      }
    }
  );


  export const getCommentThunk = createAsyncThunk(
    "api/commentthunk/get",
    async (postId, thunkAPI) => {
      try {
        const data = await apis.showComment(postId);
        // console.log("getCommentThunk", data.data.data, postId);
        return data.data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("getCommentThunkErr", err.response.data);

      }
    }
)

  export const addCommentThunk = createAsyncThunk(
    "api/commentthunk/add",
    async ({postId, content}, thunkAPI) =>  {
      try {
        const data = await apis.addComment(postId, {
          content
        });
       
        // console.log('addCommentThunk', data.data.data)
        const comments = data.data.data;
        return comments;
      } catch (err) {
        return thunkAPI.rejectWithValue("addCommentThunkErr", err.response.data);
      }
    }
  );

  export const delCommentThunk = createAsyncThunk(
    "api/commentthunk/del",
    async ( commentId, thunkAPI) => {
      try {
       const data = await apis.delComment(commentId);
        console.log("delCommentThunk", data.data.data, commentId);
        return commentId;
      } catch (err) {
        return thunkAPI.rejectWithValue("delCommentThunkErr", err.response.data);
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
    updatePicked:(state, action) =>{
      state.pickedCommentId = action.payload;
    }
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
    builder.addCase(patchJsonCommentThunk.fulfilled, (state, action)=>{
      const commentList = state.commentList;
      const commentId = action.payload.id;
      const fixedComment = action.payload.content;
      // 배열에서 index를 찾아주기
      const findCommentId = (element) =>{
       if((element?.id)===commentId) return(true)
      }
      const idx = commentList.findIndex(findCommentId);
      for (var i = 0; i < commentList.length; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
        commentList[idx]['content'] = fixedComment;
      }
      // console.log('extraReducers', action.payload.id, 'idx 출력: ', idx);

  })
    builder.addCase(getCommentThunk.fulfilled, (state, action)=>{
      // console.log('getComment extraReducers', action.payload);
      state.commentList = action.payload;
    })
    builder.addCase(addCommentThunk.fulfilled, (state, action)=>{
      // console.log('addComment extraReducers', action.payload);
      state.commentList = [...state.commentList, action.payload];
    })
    builder.addCase(delCommentThunk.fulfilled, (state, action)=>{
      // console.log('delComment extraReducers', action.payload);
      const commentList = state.commentList;
      const commentId = action.payload;
      const newCommentList = commentList.filter((c)=>{
        return parseInt(c.commentId)!==commentId;
      })
      state.commentList = newCommentList;
    })
  },
});

export const { loadPost, updatePicked} = detailSlice.actions;
export default detailSlice.reducer;
