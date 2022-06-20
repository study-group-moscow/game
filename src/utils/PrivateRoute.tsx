import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const auth = useAuth()

  return auth.user
    ? (
      <Outlet />
    )
    : (
      <Navigate to='/login' />
    )
};
