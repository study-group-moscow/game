import { ENDPOINTS, MESSAGES_TEXT, TYPES_ALERT } from '../constants/constants';
import {
  IEditUserProfileParams,
  IEditUserProfileParamsResponse
} from '../models/IUser';
import baseApi from '../store/api/baseApi';
import { forumAPI } from './ForumService';
import { IAlertTypeProps, showAlert } from '../store/reducers/AlertSlice';

const http = ENDPOINTS.YANDEX;

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
        async onQueryStarted(
          data: IEditUserProfileParamsResponse,
          { dispatch, queryFulfilled }
        ) {
          try {
            const { data: { id, display_name, second_name, first_name } } = await queryFulfilled;
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { data } = await dispatch(forumAPI.endpoints.getOneUser.initiate(id));
            await dispatch(forumAPI.endpoints.updateUser.initiate({
              id,
              score: data?.score ?? 0,
              theme: data?.theme ?? 'dark',
              second_name,
              first_name,
              display_name
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
