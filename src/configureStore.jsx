import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});

export default store;