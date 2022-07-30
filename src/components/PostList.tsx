import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PostItem from './PostItem';
import { IPostItem } from '../models/IPosts';

type TPostListProps = {
  control: any
}

const PostList = ({ control }: TPostListProps) => {
  const {
    fields,
    remove
  } = useFieldArray({
    name: 'posts',
    control
  });

  return (
    <>
      {
        fields.map((value, index) => {
          const post: IPostItem = value as IPostItem;
          return (
            <PostItem post={post} index={index} control={control} remove={remove} key={post.id} />
          )
        })
      }
    </>
  )
}

export default PostList
