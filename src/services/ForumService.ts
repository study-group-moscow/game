import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPostRequest, IPost } from '../models/IPosts';
import { IEditUserProfileForumParams } from '../models/IUser';
import { ENDPOINTS } from '../constants/constants';

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  tagTypes: ['Posts', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl: ENDPOINTS.HTTP_FORUM }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: '/post'
      }),
      providesTags: (result) => ['Posts']
    }),
    createPost: build.mutation<IPost, IPostRequest>({
      query: (body) => ({
        url: `${ENDPOINTS.FORUM.PATH_POST}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `${ENDPOINTS.FORUM.PATH_POST}/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Posts']
    }),
    updatePost: build.mutation<IPost, IPost>({
      query(post) {
        return {
          url: `${ENDPOINTS.FORUM.PATH_POST}/${post.id}`,
          method: 'PUT',
          body: post
        }
      },
      invalidatesTags: ['Posts']
    }),
    createUser: build.mutation<IEditUserProfileForumParams, IEditUserProfileForumParams>({
      query: (body) => ({
        url: `${ENDPOINTS.FORUM.PATH_USER}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
    updateUser: build.mutation<IEditUserProfileForumParams, IEditUserProfileForumParams>({
      query: (user) => ({
        url: `${ENDPOINTS.FORUM.PATH_USER}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    getOneUser: build.query<IEditUserProfileForumParams, number>({
      query: (id) => ({
        url: `${ENDPOINTS.FORUM.PATH_USER}/${id}`,
        method: 'GET'
      }),
      providesTags: ['User']
    })
  })
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetOneUserQuery
} = forumAPI;

