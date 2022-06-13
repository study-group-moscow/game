import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from '../../models/IUserResponse';
import { RootState } from '../store';

// Как образец, не финальное решение!!!!
interface IAuthState {
  user: IUserResponse | null;
  isLoading: boolean;
  error: string;
}

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  error: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserResponse | null>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
    }
  }
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user

