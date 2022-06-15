import React from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { selectCurrentUser } from '../store/reducers/AuthSlice';
import { RouterLinks } from './consts';

export const PrivateRoute: React.FC<{ element: JSX.Element, isPrivate?: boolean }> = ({ element, isPrivate = true }) => {
  const user = useAppSelector(selectCurrentUser);
  const { pathname } = useLocation();
  const isLogin = pathname === RouterLinks.LOGIN || pathname === RouterLinks.REGISTRATION;

  if (!isPrivate && isLogin && user) {
    console.log(1)
    return <Navigate to='/' />;
  }

  if (!user && !isLogin) {
    console.log(2)
    return <Navigate to='/login' />;
  }
  console.log(3)
  return element;
};
