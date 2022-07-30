import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/AlertSlice';
import baseApi from './api/baseApi';
import showToast from './middleware/showToast'

export const store = configureStore({
  reducer: {
    alertReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    baseApi.middleware,
    showToast
  ])
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
