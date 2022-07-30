import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPostRequest, IPost } from '../models/IPosts';

type PostsResponse = IPostRequest;

export const postAPI = createApi({
  reducerPath: 'Posts',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8989/post/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: '/'
      }),
      providesTags: ['Posts']
    }),
    addPost: build.mutation<IPost, PostsResponse>({
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
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } = postAPI;

