import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import alertReducer from './reducers/AlertSlice';
import baseApi from './api/baseApi';

export const store = configureStore({
  reducer: {
    authReducer,
    alertReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
