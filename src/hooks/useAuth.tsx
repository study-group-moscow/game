import { useMemo } from 'react'
import { useFetchUserQuery } from '../services/AuthServices';

export const useAuth = () => {
  const { data: user, isSuccess, isError, error } = useFetchUserQuery('');

  return useMemo(() => ({ user, isSuccess, isError, error }), [user]);
}
