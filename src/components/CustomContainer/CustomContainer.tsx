import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { selectCurrentIsAuth, setCredentials } from '../../store/reducers/AuthSlice';
import { useFetchUserMutation } from '../../services/AuthServices';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { MESSAGES_TEXT, TYPES_ALERT } from '../../utils/consts';
import { IUserResponse } from '../../models/IUserResponse';
import { IErrorResponse } from '../../models/IErrorResponse';

const AlertContainer = lazy(() => import(/* webpackChunkName: "AlertContainer" */ '../AlertContainer/AlertContainer'))

type TCustomContainerProps = {
  children: JSX.Element;
}

const CustomContainer = ({ children }: TCustomContainerProps) => {
  const isAuth = useAppSelector(selectCurrentIsAuth);
  const dispatch = useDispatch();

  const [login, {
    data,
    isSuccess,
    isLoading,
    error,
    isError
  }] = useFetchUserMutation();

  useEffect(() => {
    try {
      login('');
    } catch (e) {
      dispatch(showAlert({
        text: MESSAGES_TEXT.ERROR_OCCURRED,
        type: TYPES_ALERT.ERROR as IAlertTypeProps
      }));
    }
  }, [isAuth])

  useEffect(() => {
    if (isSuccess) {
      const user = data as IUserResponse;
      dispatch(setCredentials(user));
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      const err = ((error) as IErrorResponse);
      dispatch(showAlert({
        text: err?.data?.reason ?? '',
        type: TYPES_ALERT.ERROR as IAlertTypeProps
      }));
    }
  }, [error])

  return (
    <AlertContainer
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      error={error as IErrorResponse}
      data={data}
    >
      {children}
    </AlertContainer>
  )
};

export default CustomContainer;
