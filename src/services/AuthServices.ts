import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../utils/consts';
import { IUserResponse } from '../models/IUserResponse';

interface ISiginParams {
  login: string;
  password: string
}

// Как образец, не финальное решение!!!!
export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({ baseUrl: `${ENDPOINTS.HTTP}/${ENDPOINTS.AUTH.PATH}` }),
  endpoints: (build) => ({
    fetchUser: build.mutation<IUserResponse, string>({
      query: () => ({
        url: ENDPOINTS.AUTH.USER,
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      })
    }),
    fetchSigIn: build.mutation<IUserResponse, ISiginParams>({
      query: (body) => ({
        url: ENDPOINTS.AUTH.SIGNIN,
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Auth']
    }),
    fetchLogout: build.mutation<IUserResponse, string>({
      query: () => ({
        url: `${ENDPOINTS.HTTP}/${ENDPOINTS.AUTH.PATH}/${ENDPOINTS.AUTH.LOGOUT}`,
        mode: 'cors',
        credentials: 'include',
        method: 'POST'
      }),
      invalidatesTags: ['Auth']
    })
  })
})

export const { useFetchSigInMutation, useFetchUserMutation, useFetchLogoutMutation } = authAPI;
