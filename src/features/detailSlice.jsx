import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../api/api";

const initialState = {
    post:[],
    comments:[],
    userInfo:[]
};

const getDetailThunk = createAsyncThunk(
    '/api/posts/detail',
    async (postId, thunkAPI) => {
        try {
            const data = await apis.getDeatil(postId)
            const postDetail = data.data.data;
            // console.log('thunk',data.data.data)
            return postDetail;
        }catch(err){
            return thunkAPI.rejectWithValue('getDetailThunkErr', err.response.data);
        }
    }
)

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailThunk.fulfilled, (state, action)=>{
        state.post = action.payload;
    })
  }
})

export default detailSlice.reducer;