import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from '../../models/IUserResponse';
import { authAPI } from '../../services/AuthServices'
import type { RootState } from '../store';

interface IAuthState {
  user: IUserResponse | null;
  isLoggedIn: boolean
}

const initialState: IAuthState = {
  user: null,
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserResponse | null>) => {
      state.user = action.payload;
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.fetchUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.id) {
          state.user = payload
          state.isLoggedIn = true
        } else {
          state.user = null
          state.isLoggedIn = false
        }
      }
    )
  }
})

export const { setCredentials, setLoginStatus } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user
export const selectIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn
