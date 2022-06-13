import { Navigate, useLocation } from 'react-router-dom'
import React from 'react';

import { Container } from '@mui/material';
import { RouterLinks } from './consts';

export const NotFound = () => {
  const { pathname } = useLocation();

  if (pathname === RouterLinks.LOGIN || pathname === RouterLinks.REGISTRATION) {
    return <Navigate to='/' />;
  }

  return <Container>Not Found</Container>;
};
