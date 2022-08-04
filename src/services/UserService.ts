import { ENDPOINTS } from '../constants/constants';
import {
  IEditUserProfileParams,
  IEditUserProfileParamsResponse
} from '../models/IUser';
import baseApi from '../store/api/baseApi';

const http = ENDPOINTS.HTTP;

export const userAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth'] })
  .injectEndpoints({
    endpoints: (build) => ({
      editProfile: build.mutation<IEditUserProfileParamsResponse, IEditUserProfileParams>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.USER.PATH}${ENDPOINTS.USER.PROFILE}`,
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Auth']
      }),
      editAvatar: build.mutation<IEditUserProfileParamsResponse, FormData>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.USER.PATH}${ENDPOINTS.USER.PROFILE}${ENDPOINTS.USER.AVATAR}`,
          method: 'PUT',
          body
        }),
        invalidatesTags: ['Auth']
      })
    })
  })

export const {
  useEditProfileMutation,
  useEditAvatarMutation
} = userAPI
