import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { IEditUserProfileForumParams } from '../models/IUser';
import { ENDPOINTS } from '../constants/constants';
import { IUserResponse } from '../models/IUserResponse';
import { IErrorResponse } from '../models/IErrorResponse';
import { ISignInParams, ISignInParamsOauth, ISignInResponseOauth } from '../models/ISignInParams';
import { ISignUpParams } from '../models/ISignUpParams';
import { IOauthDataResponse } from '../models/IOauthDataResponse';
import baseApi from '../store/api/baseApi';
import { checkObjectKeysAreEqual } from '../utils/helperFunctions'

const http = ENDPOINTS.YANDEX;
const http_forum = ENDPOINTS.FRONT_BACK;

export const authAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth', 'OauthData'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchUser: build.query<IUserResponse, void>({
        async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
          // 1 шаг - заберем юзера из ручки яндекса
          const result = await fetchWithBQ({
            url: `${http}${ENDPOINTS.AUTH.PATH}${ENDPOINTS.AUTH.USER}`,
            method: 'GET'
          })

          const user = result.data as IUserResponse

          // 2 шаг - если успешно, то проверим занесен ли он в локальную БД
          if (user) {
            const resultLocalDb = await fetchWithBQ({
              url: `${http_forum}${ENDPOINTS.FORUM.PATH_USER}/${user.id}`,
              method: 'GET'
            })

            const userLocalDb = resultLocalDb.data as IEditUserProfileForumParams

            // 3 шаг - если не занесен, то создадим, иначе проверим на сответствие
            // и, возможно, обновим.
            if (!userLocalDb) {
              await fetchWithBQ({
                url: `${http_forum}${ENDPOINTS.FORUM.PATH_USER}`,
                method: 'POST',
                body: {
                  id: user.id,
                  second_name: user.second_name,
                  first_name: user.first_name,
                  display_name: user.display_name,
                  score: 0,
                  theme: 'light'
                }
              })
            } else {
              const shouldUpdateLocalDbUser = checkObjectKeysAreEqual({
                objA: user,
                objB: userLocalDb,
                keys: ['second_name', 'first_name', 'display_name']
              })

              if (shouldUpdateLocalDbUser) {
                await fetchWithBQ({
                  url: `${http_forum}${ENDPOINTS.FORUM.PATH_USER}`,
                  method: 'PATCH',
                  body: {
                    id: userLocalDb.id,
                    second_name: user.second_name,
                    first_name: user.first_name,
                    display_name: user.display_name
                  }
                })
              }
            }
          }

          return user ? { data: user } : { error: result.error as FetchBaseQueryError }
        },
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

