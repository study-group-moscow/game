import { useMemo } from 'react'
import { useFetchUserQuery } from '../services/AuthServices';

export default () => {
  const { data: user, isSuccess, isError, isLoading, error } = useFetchUserQuery();

  return useMemo(() => ({ user, isSuccess, isError, isLoading, error }), [user]);
}
