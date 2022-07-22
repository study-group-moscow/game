import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import AppBar from '../components/AppBar/AppBar'
import { useFetchUserQuery } from '../services/AuthServices';

export default () => {
  const isOnHomeRoute = window.location.pathname === '/'
  console.log('-----isOnHomeRoute=', isOnHomeRoute)
  const { data: user, isSuccess } = useFetchUserQuery(undefined, { skip: isOnHomeRoute });

  if ((isSuccess && !user)) return <Navigate to='/login' />
  return (
    <>
      { window.location.pathname !== '/' && <AppBar /> }

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  )
};
