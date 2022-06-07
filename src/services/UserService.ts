import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUser } from '../models/IUser';

// Как образец, не финальное решение!!!!
const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit = 5) => ({
        url: '/users',
        params: {
          _limit: limit
        }
      }),
      providesTags: (result) => ['User']
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
});

export default userAPI;
