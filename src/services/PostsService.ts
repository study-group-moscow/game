import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPostRequest, IPost } from '../models/IPosts';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8989/post/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: '/'
      }),
      providesTags: result => ['Posts']
    }),
    createPost: build.mutation<IPost, IPostRequest>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Posts']
    }),
    updatePost: build.mutation<IPost, IPost>({
      query(post) {
        return {
          url: `/${post.id}`,
          method: 'PUT',
          body: post
        }
      },
      invalidatesTags: ['Posts']
    })
  })
})

export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } = postAPI;

