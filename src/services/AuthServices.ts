import { ENDPOINTS, MESSAGES_TEXT, TYPES_ALERT } from '../constants/constants';
import { IUserResponse } from '../models/IUserResponse';
import { IErrorResponse } from '../models/IErrorResponse';
import { ISignInParams, ISignInParamsOauth, ISignInResponseOauth } from '../models/ISignInParams';
import { ISignUpParams } from '../models/ISignUpParams';
import { IOauthDataResponse } from '../models/IOauthDataResponse';
import baseApi from '../store/api/baseApi';
import { forumAPI } from './ForumService';
import { IAlertTypeProps, showAlert } from '../store/reducers/AlertSlice';

const http = ENDPOINTS.YANDEX;

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
        async onQueryStarted(
          { second_name, first_name, display_name },
          { dispatch, queryFulfilled }
        ) {
          try {
            const { data: { id } } = await queryFulfilled;
            await dispatch(forumAPI.endpoints.createUser.initiate({
              id,
              second_name,
              first_name,
              display_name,
              score: 0,
              theme: 'light'
            }));
          } catch (e) {
            dispatch(showAlert({
              text: MESSAGES_TEXT.ERROR_OCCURRED,
              type: TYPES_ALERT.ERROR as IAlertTypeProps
            }))
          }
        },
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

