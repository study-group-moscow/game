import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../utils/consts';
import { IUserResponse } from '../models/IUserResponse';
import { ISigUpParam } from '../pages/Registration/Registration';
import { ISigInParam } from '../pages/Login/Login';
import { IErrorResponse } from '../models/IErrorResponse';

// Как образец, не финальное решение!!!!
export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({ baseUrl: `${ENDPOINTS.HTTP}${ENDPOINTS.AUTH.PATH}` }),
  endpoints: (build) => ({
    fetchUser: build.mutation<IUserResponse, string>({
      query: () => ({
        url: ENDPOINTS.AUTH.USER,
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      })
    }),
    fetchSigIn: build.mutation<IErrorResponse, ISigInParam>({
      query: (body) => ({
        url: ENDPOINTS.AUTH.SIGNIN,
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        responseHandler: (response) => (
          (response.status === 200)
            ? response.text()
            : response.json()),
        body
      }),
      invalidatesTags: ['Auth']
    }),
    fetchSigUp: build.mutation<IUserResponse, ISigUpParam>({
      query: (body) => ({
        url: ENDPOINTS.AUTH.SIGNUP,
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

export const { useFetchSigInMutation, useFetchSigUpMutation, useFetchUserMutation, useFetchLogoutMutation } = authAPI;
