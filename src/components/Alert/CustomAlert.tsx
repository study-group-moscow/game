import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  hideAlert,
  selectCurrentState
} from '../../store/reducers/AlertSlice';

import './CustomAlert.module.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref
) => <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />);

const CustomAlert = () => {
  const dispatch = useAppDispatch();
  const { text, open, type } = useAppSelector(selectCurrentState);

  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideAlert());
  }, []);

  return (
    <Stack spacing={2} className='customAlert'>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default CustomAlert;
