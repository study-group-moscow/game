import { IUser } from '../models/IUser';
import baseApi from '../store/api/baseApi';

const userAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchAllUsers: build.query<IUser[], number>({
        query: (limit = 5) => ({
          url: '/users',
          params: {
            _limit: limit
          }
        }),
        providesTags: ['User']
      }),
      createUser: build.mutation<IUser, IUser>({
        query: (user) => ({
          url: '/user',
          method: 'POST',
          body: user
        }),
        invalidatesTags: ['User']
      }),
      updateUser: build.mutation<IUser, IUser>({
        query: (user) => ({
          url: `/users/${user.id}`,
          method: 'PUT',
          body: user
        }),
        invalidatesTags: ['User']
      }),
      deleteUser: build.mutation<IUser, IUser>({
        query: (user) => ({
          url: `/posts/${user.id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['User']
      })
    })
  })

export default userAPI
