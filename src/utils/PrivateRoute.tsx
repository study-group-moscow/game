import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import AppBar from '../components/AppBar/AppBar'
import { useFetchUserQuery } from '../services/AuthServices';

export default () => {
  const { data: user, isSuccess } = useFetchUserQuery();

  if (isSuccess && !user) return <Navigate to='/login' />
  return (
    <>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  )
};
