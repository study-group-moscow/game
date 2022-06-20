import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const { user, isSuccess, isError } = useAuth();

  if ((!user && isError) || (isSuccess && !user)) {
    return <Navigate to='/login' />
  }

  return <Outlet />
};
