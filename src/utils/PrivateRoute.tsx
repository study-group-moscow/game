import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';
import AppBar from '../components/AppBar/AppBar'

export default () => {
  const { isFetching, user } = useAuth();

  if (isFetching) return <Loader />
  if (!user) return <Navigate to='/login' />
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  )
};
