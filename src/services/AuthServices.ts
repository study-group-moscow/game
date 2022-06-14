import { ENDPOINTS } from '../utils/consts';
import { IUserResponse } from '../models/IUserResponse';
import { IErrorResponse } from '../models/IErrorResponse';
import { ISigInParams } from '../models/ISigInParams';
import { ISigUpParams } from '../models/ISigUpParams';
import { baseApi } from '../store/api/emptySplitApi';

// Как образец, не финальное решение!!!!
export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUser: build.mutation<IUserResponse, string>({
      query: () => ({
        url: ENDPOINTS.AUTH.USER,
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      })
    }),
    fetchSigIn: build.mutation<IErrorResponse, ISigInParams>({
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
    fetchSigUp: build.mutation<IUserResponse, ISigUpParams>({
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
  }),
  overrideExisting: false
})

export const { useFetchSigInMutation, useFetchSigUpMutation } = authAPI;
export const { useFetchUserMutation, useFetchLogoutMutation } = authAPI;
