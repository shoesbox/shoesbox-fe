import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailReducer from './features/detailSlice';
import writeReducer from './features/writeSlice';

const rootReducer = combineReducers({
  detail: detailReducer,
  write: writeReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
