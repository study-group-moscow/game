import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';

export default () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Loader />
  if (!user) return <Navigate to='/login' />
  return <Outlet />
};
