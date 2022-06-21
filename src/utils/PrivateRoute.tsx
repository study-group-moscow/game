import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../hooks/redux'
import { selectCurrentUser, selectIsLoggedIn } from '../store/reducers/AuthSlice'

export default () => {
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { isLoading } = useAuth();
  console.log('---user=', user, 'isLoggedIn=', isLoggedIn)

  return user || (isLoggedIn && isLoading) ? <Outlet /> : <Navigate to='/login' />
};
