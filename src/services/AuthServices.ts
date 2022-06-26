import { ENDPOINTS } from '../constants/constants';
import { IUserResponse } from '../models/IUserResponse';
import { IErrorResponse } from '../models/IErrorResponse';
import { ISignInParams } from '../models/ISignInParams';
import { ISigUpParams } from '../models/ISigUpParams';
import baseApi from '../store/api/baseApi';

export const authAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchUser: build.query<IUserResponse, void>({
        query: () => ({
          url: `${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.USER}`
        }),
        providesTags: ['Auth']
      }),
      fetchSigIn: build.mutation<IErrorResponse, ISignInParams>({
        query: (body) => ({
          url: `${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.SIGNIN}`,
          method: 'POST',
          responseHandler: (response) => (
            (response.status === 200)
              ? response.text()
              : response.json()),
          body
        }),
        invalidatesTags: ['Auth']
      }),
      fetchSigUp: build.mutation<IUserResponse, ISigUpParams>({
        query: (body) => ({
          url: `${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.SIGNUP}`,
          method: 'POST',
          body
        }),
        invalidatesTags: ['Auth']
      }),
      fetchLogout: build.mutation<IUserResponse, void>({
        query: () => ({
          url: `${ENDPOINTS.HTTP}${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.LOGOUT}`,
          method: 'POST'
        }),
        invalidatesTags: ['Auth']
      })
    })
  })

export const {
  useFetchSigInMutation,
  useFetchSigUpMutation,
  useFetchUserQuery,
  useFetchLogoutMutation
} = authAPI;

