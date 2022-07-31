import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPostRequest, IPost } from '../models/IPosts';
import { IEditUserProfileForumParams } from '../models/IUser';

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  tagTypes: ['Posts', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8989/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: '/post'
      }),
      providesTags: (result) => ['Posts']
    }),
    createPost: build.mutation<IPost, IPostRequest>({
      query: (body) => ({
        url: '/post',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/post/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Posts']
    }),
    updatePost: build.mutation<IPost, IPost>({
      query(post) {
        return {
          url: `/post/${post.id}`,
          method: 'PUT',
          body: post
        }
      },
      invalidatesTags: ['Posts']
    }),
    createUser: build.mutation<IEditUserProfileForumParams, IEditUserProfileForumParams>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
    updateUser: build.mutation<IEditUserProfileForumParams, IEditUserProfileForumParams>({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    })
  })
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateUserMutation,
  useUpdateUserMutation
} = forumAPI;

