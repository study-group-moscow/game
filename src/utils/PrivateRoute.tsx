import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { selectCurrentUser } from '../store/reducers/AuthSlice';

export const PrivateRoute: React.FC<{ children: JSX.Element, authComponents: JSX.Element }> = ({ children, authComponents }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user) {
    return authComponents;
  }

  return children;
};
