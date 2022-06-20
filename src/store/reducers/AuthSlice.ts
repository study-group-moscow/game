import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from '../../models/IUserResponse';
import type { RootState } from '../store';

// Как образец, не финальное решение!!!!
interface IAuthState {
  user: IUserResponse | null;
}

const initialState: IAuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserResponse | null>) => {
      state.user = action.payload;
    }
  }
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user
