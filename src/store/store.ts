import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './reducers/AuthSlice';
import alertReducer from './reducers/AlertSlice';
import baseApi from './api/baseApi';

export const store = configureStore({
  reducer: {
    authReducer,
    alertReducer,
    [baseApi.reducerPath]: baseApi.reducer
  }
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
