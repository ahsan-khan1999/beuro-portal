import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import reducer from './mainReducer/main';


const reducers = combineReducers(reducer);

export const store = configureStore({
  reducer: reducers,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;