import { combineReducers, configureStore } from "@reduxjs/toolkit";
import detailReducer from './features/detailSlice';

const rootReducer = combineReducers({
  detail: detailReducer,

});

const store = configureStore({ reducer: rootReducer });

export default store;
