import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const loginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLogin } = loginSlice.actions;
export default loginSlice.reducer;
