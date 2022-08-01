import { ENDPOINTS } from '../constants/constants';
import { IUserResponse } from '../models/IUserResponse';
import { IErrorResponse } from '../models/IErrorResponse';
import { ISignInParams, ISignInParamsOauth, ISignInResponseOauth } from '../models/ISignInParams';
import { ISignUpParams } from '../models/ISignUpParams';
import { IOauthDataResponse } from '../models/IOauthDataResponse';
import baseApi from '../store/api/baseApi';

const http = ENDPOINTS.HTTP;

export const authAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth', 'OauthData'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchUser: build.query<IUserResponse, void>({
        query: () => ({
          url: `${http}${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.USER}`
        }),
        providesTags: ['Auth']
      }),
      fetchSignIn: build.mutation<IErrorResponse, ISignInParams>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.SIGNIN}`,
          method: 'POST',
          responseHandler: (response) => (
            (response.status === 200)
              ? response.text()
              : response.json()),
          body
        }),
        invalidatesTags: ['Auth']
      }),
      fetchSignInOauth: build.mutation<ISignInResponseOauth, ISignInParamsOauth>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.AUTH.PATH_OAUTH}${ENDPOINTS.AUTH.YANDEX}`,
          method: 'POST',
          responseHandler: (response) => (
            (response.status === 200)
              ? response.text()
              : response.json()),
          body
        }),
        invalidatesTags: ['Auth']
      }),
      fetchOauthData: build.query<IOauthDataResponse, string>({
        query: (redirect_uri) => ({
          params: { redirect_uri },
          url: `${http}${ENDPOINTS.AUTH.PATH_OAUTH}${ENDPOINTS.AUTH.YANDEX}${ENDPOINTS.AUTH.SERVICE_ID}`,
          method: 'GET'
        }),
        providesTags: ['OauthData']
      }),
      fetchSignUp: build.mutation<IUserResponse, ISignUpParams>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.SIGNUP}`,
          method: 'POST',
          body
        }),
        invalidatesTags: ['Auth']
      }),
      fetchLogout: build.mutation<IUserResponse, void>({
        query: () => ({
          url: `${http}${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.LOGOUT}`,
          method: 'POST',
          responseHandler: (response) => (
            response.status === 200 ? response.text() : response.json()
          )
        })
      })
    })
  })

export const {
  useFetchSignInMutation,
  useFetchSignInOauthMutation,
  useFetchSignUpMutation,
  useFetchUserQuery,
  useFetchLogoutMutation,
  useFetchOauthDataQuery
} = authAPI;

