import { Navigate, useLocation } from 'react-router-dom'
import React from 'react';

import { RouterLinks } from './consts';

export default () => {
  const { pathname } = useLocation();

  if (pathname === RouterLinks.LOGIN || pathname === RouterLinks.REGISTRATION) {
    return <Navigate to='/login' />;
  }

  return <div>Not Found</div>;
}
