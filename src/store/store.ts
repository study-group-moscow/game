import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './reducers/UserSlice'
import userAPI from '../services/UserService';
import { authAPI } from '../services/AuthServices';

const rootReducer = combineReducers({
  userReducer,
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

// setupListeners(createStore().dispatch);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
