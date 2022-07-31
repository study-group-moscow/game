import React from 'react';
import PostItem from './PostItem';
import { IPost } from '../models/IPosts';
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation
} from '../services/PostsService';
import Loader from './Loader/Loader';

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery(1);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleRemove = async (id: number) => {
    deletePost(id)
  }
  const handleUpdate = async (post: IPost) => {
    updatePost(post)
  }

  if (isLoading) return (<Loader />)

  return (
    <>
      {
        posts.map((post: IPost) => (
          <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />
        ))
      }
    </>
  )
}

export default PostList
