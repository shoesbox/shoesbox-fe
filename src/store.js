import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailReducer from './features/detailSlice';
import friendReducer from './features/friendSlice';
import writeReducer from './features/writeSlice';
import calendarReducer from './features/calenderSlice';

// import from './features/'

const rootReducer = combineReducers({
  calender: calendarReducer,
  detail: detailReducer,
  write: writeReducer,
  friend: friendReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
