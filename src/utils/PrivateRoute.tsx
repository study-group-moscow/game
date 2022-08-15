import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar'
import { useFetchUserQuery } from '../services/AuthServices';

export default () => {
  const location = useLocation();
  const isOnHomeRoute = location.pathname === '/'
  const { data: user, isSuccess, isError } = useFetchUserQuery(undefined, { skip: isOnHomeRoute });

  if ((isSuccess && !user) || isError) return <Navigate to='/login' />
  return (
    <>
      { !isOnHomeRoute && <AppBar /> }

      <Outlet />
    </>
  )
};
