import { skipToken } from '@reduxjs/toolkit/query'
import { useGetOneUserQuery } from '../services/ForumService';
import { useFetchUserQuery } from '../services/AuthServices';

function useGetLocalDbUser({ skip }: { skip: boolean }) {
  const { data: user, isSuccess } = useFetchUserQuery(skip ? skipToken : undefined)
  const { data: localDbUser } = useGetOneUserQuery(isSuccess ? user.id : skipToken);
  return localDbUser
}

export default useGetLocalDbUser
