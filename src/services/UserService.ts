import { ENDPOINTS } from '../constants/constants';
import { IEditUserProfileParams, IEditUserProfileParamsResponse } from '../models/IUser';
import baseApi from '../store/api/baseApi';

export const userAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth'] })
  .injectEndpoints({
    endpoints: (build) => ({
      editProfile:
        build.mutation<IEditUserProfileParamsResponse, IEditUserProfileParams>({
          query: (body) => ({
            url: `${ENDPOINTS.USER.PATH}${ENDPOINTS.USER.PROFILE}`,
            method: 'PUT',
            body
          }),
          invalidatesTags: ['Auth']
        })
    })
  })

export const {
  useEditProfileMutation
} = userAPI
