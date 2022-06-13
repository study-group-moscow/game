import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type IAlertTypeProps = 'success' | 'info' | 'warning' | 'error';

interface IAlertProps {
  text: string;
  type: IAlertTypeProps;
  open?: boolean;
}

const initialState: IAlertProps = {
  text: '',
  type: 'success',
  open: false
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlertProps>) => {
      state.open = true;
      state.text = action.payload?.text ?? '';
      state.type = action.payload?.type ?? 'success';
    },
    hideAlert: (state) => {
      state.open = false;
      state.text = '';
    }
  }
})

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer

export const selectCurrentText = (state: RootState) => state.alertReducer.text;
export const selectCurrentOpen = (state: RootState) => state.alertReducer.open;
export const selectCurrentType = (state: RootState) => state.alertReducer.type;

