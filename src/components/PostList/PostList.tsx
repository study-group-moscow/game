import React from 'react';
import { Paper } from '@mui/material';
import PostItem from '../PostItem/PostItem';
import { IPost } from '../../models/IPosts';
import {
  useRemovePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation
} from '../../services/ForumService';
import Loader from '../Loader/Loader';

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery(1);
  const [removePost] = useRemovePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleRemove = async (id: number) => {
    removePost(id)
  }
  const handleUpdate = async (post: IPost) => {
    updatePost(post)
  }

  if (isLoading) return (<Loader />)

  return (
    <>
      {
        posts.map((post: IPost) => (
          <PostItem key={post.id} post={post} onRemove={handleRemove} onUpdate={handleUpdate} />
        ))
      }
    </>
  )
}

export default PostList
