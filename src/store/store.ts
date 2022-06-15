import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import alertReducer from './reducers/AlertSlice';
import { baseApi } from './api/baseApi';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  alertReducer,
  [baseApi.reducerPath]: baseApi.reducer
})

export const createStore = () => configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
    .concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
