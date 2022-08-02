import { IPost, IPostRequest } from '../models/IPosts';
import { IEditUserProfileForumParams } from '../models/IUser';
import { ENDPOINTS } from '../constants/constants';
import baseApi from '../store/api/baseApi';

const http = ENDPOINTS.HTTP_FORUM;

export const forumAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Posts', 'User'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getPosts: build.query({
        query: () => ({
          url: `${http}${ENDPOINTS.FORUM.PATH_POST}`
        }),
        providesTags: ['Posts']
      }),
      createPost: build.mutation<IPost, IPostRequest>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.FORUM.PATH_POST}`,
          method: 'POST',
          body
        }),
        invalidatesTags: ['Posts']
      }),
      removePost: build.mutation<{ success: boolean; id: number }, number>({
        query(id) {
          return {
            url: `${http}${ENDPOINTS.FORUM.PATH_POST}/${id}`,
            method: 'DELETE'
          }
        },
        invalidatesTags: ['Posts']
      }),
      updatePost: build.mutation<IPost, IPost>({
        query(post) {
          return {
            url: `${http}${ENDPOINTS.FORUM.PATH_POST}/${post.id}`,
            method: 'PUT',
            body: post
          }
        },
        invalidatesTags: ['Posts']
      }),
      createUser: build.mutation<IEditUserProfileForumParams, IEditUserProfileForumParams>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.FORUM.PATH_USER}`,
          method: 'POST',
          body
        }),
        invalidatesTags: ['User']
      }),
      updateUser: build.mutation<IEditUserProfileForumParams, IEditUserProfileForumParams>({
        query: (user) => ({
          url: `${http}${ENDPOINTS.FORUM.PATH_USER}`,
          method: 'PUT',
          body: user
        }),
        invalidatesTags: ['User']
      })
    })
  })

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
  useCreateUserMutation,
  useUpdateUserMutation
} = forumAPI;

