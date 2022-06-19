import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from '../../models/IUserResponse';
import type { RootState } from '../store';

// Как образец, не финальное решение!!!!
interface IAuthState {
  user: IUserResponse | null;
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserResponse | null>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.user = null;
    }
  }
})

export const { setCredentials, setAuth, setLogout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user
export const selectCurrentIsAuth = (state: RootState) => state.authReducer.isAuth

