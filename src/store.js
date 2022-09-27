import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailReducer from './features/detailSlice';
import friendReducer from './features/friendSlice';
import writeReducer from './features/writeSlice';
import loginReducer from './features/loginSlice';
// import from './features/'

const rootReducer = combineReducers({
  // calender: calenderSlice,
  login: loginReducer,
  detail: detailReducer,
  write: writeReducer,
  friend: friendReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
