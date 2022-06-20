import { useMemo } from 'react'
import { useFetchUserQuery } from '../services/AuthServices';

export const useAuth = () => {
  const { data: user } = useFetchUserQuery('');

  return useMemo(() => ({ user }), [user]);
}
