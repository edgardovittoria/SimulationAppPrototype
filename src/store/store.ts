import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { UsersSlice } from 'cad-library';
import {ProjectSlice} from "./projectSlice";
import {MesherSlice} from "./mesherSlice";


const rootReducer = combineReducers({
  projects: ProjectSlice.reducer,
  mesher: MesherSlice.reducer,
  user: UsersSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;


