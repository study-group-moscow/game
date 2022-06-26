import { useMemo } from 'react'
import { useFetchUserQuery } from '../services/AuthServices';

export default () => {
  const { data: user, isSuccess, isError, isFetching, error } = useFetchUserQuery();
  return useMemo(
    () => (
      { user, isSuccess, isError, isFetching, error }),
    [user, isFetching, isError, isSuccess]
  );
}
