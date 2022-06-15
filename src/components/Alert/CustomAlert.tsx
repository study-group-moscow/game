import React from 'react';
import Stack from '@mui/material/Stack';
import styles from './customAlert.module.scss';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  hideAlert,
  selectCurrentText,
  selectCurrentOpen, selectCurrentType
} from '../../store/reducers/AlertSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref
) => <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />);

const CustomAlert = () => {
  const dispatch = useAppDispatch();
  const text = useAppSelector(selectCurrentText);
  const open = useAppSelector(selectCurrentOpen);
  const type = useAppSelector(selectCurrentType);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideAlert())
  };

  return (
    <Stack spacing={2} className={styles.customAlert}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default CustomAlert;
