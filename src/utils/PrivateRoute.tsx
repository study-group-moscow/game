import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import AppBar from '../components/AppBar/AppBar'
import { useFetchUserQuery } from '../services/AuthServices';

export default () => {
  const { data: user, isFetching } = useFetchUserQuery();

  if (isFetching) return <Loader />
  if (!user) return <Navigate to='/login' />
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  )
};
