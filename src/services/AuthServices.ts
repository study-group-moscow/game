import { ENDPOINTS } from '../constants/constants';
import { IUserResponse } from '../models/IUserResponse';
import { IErrorResponse } from '../models/IErrorResponse';
import { ISignInParams, ISignInParamsOauth } from '../models/ISignInParams';
import { ISignUpParams } from '../models/ISignUpParams';
import { IServiceIdResponse } from '../models/IServiceIdResponse';
import baseApi from '../store/api/baseApi';

export const authAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth', 'Token', 'ServiceId'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchUser: build.query<IUserResponse, void>({
        query: () => ({
          url: `${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.USER}`
        }),
        providesTags: ['Auth']
      }),
      fetchSignIn: build.mutation<IErrorResponse, ISignInParams>({
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
      fetchSignInOauth: build.mutation<IErrorResponse, ISignInParamsOauth>({
        query: (body) => ({
          url: `${ENDPOINTS.AUTH.PATH_OAUTH}${ENDPOINTS.AUTH.YANDEX}`,
          method: 'POST',
          responseHandler: (response) => (
            (response.status === 200)
              ? response.text()
              : response.json()),
          body
        }),
        invalidatesTags: ['Token']
      }),
      fetchServiceId: build.query<IServiceIdResponse, string>({
        query: (redirect_uri) => ({
          params: { redirect_uri },
          url: `${ENDPOINTS.AUTH.PATH_OAUTH}${ENDPOINTS.AUTH.YANDEX}${ENDPOINTS.AUTH.SERVICE_ID}`,
          method: 'GET'
        }),
        providesTags: ['ServiceId']
      }),
      fetchSignUp: build.mutation<IUserResponse, ISignUpParams>({
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
  useFetchSignInMutation,
  useFetchSignInOauthMutation,
  useFetchSignUpMutation,
  useFetchUserQuery,
  useFetchLogoutMutation,
  useFetchServiceIdQuery
} = authAPI;

