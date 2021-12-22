import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {ProjectSlice} from "./projectSlice";

const rootReducer = combineReducers({
  projects: ProjectSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;


