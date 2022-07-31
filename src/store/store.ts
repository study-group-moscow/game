import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/AlertSlice';
import baseApi from './api/baseApi';
import showToast from './middleware/showToast'
import { forumAPI } from '../services/ForumService';

export const store = configureStore({
  reducer: {
    alertReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [forumAPI.reducerPath]: forumAPI.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    baseApi.middleware,
    forumAPI.middleware,
    showToast
  ])
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
