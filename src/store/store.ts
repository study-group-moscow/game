import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import alertReducer from './reducers/AlertSlice';
import userAPI from '../services/UserService';
import { authAPI } from '../services/AuthServices';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  alertReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer
})

export const createStore = () => configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
    .concat(userAPI.middleware)
    .concat(authAPI.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
