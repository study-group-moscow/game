import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IErrorResponse } from '../../models/IErrorResponse';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { TYPES_ALERT } from '../../utils/consts';
import { setAuth } from '../../store/reducers/AuthSlice';
import Loader from '../Loader/Loader';

type TContainerProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  data: any;
  error: IErrorResponse;
  children: JSX.Element;
}

const AlertContainer = ({ children,
  isSuccess,
  isError,
  isLoading,
  error,
  data }: TContainerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      const err = ((error) as IErrorResponse);
      dispatch(showAlert({
        text: err?.data?.reason ?? '',
        type: TYPES_ALERT.ERROR as IAlertTypeProps
      }));
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(true));
    }
  }, [data])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        isLoading && <Loader />
      }
      {children}
    </>
  );
}
export default AlertContainer;
