import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PostItem from './PostItem';

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
        fields.map((post, index) => {
          console.log(post)
          return <div />

          // return (
          //   <PostItem post={post} index={index} control={control} remove={remove} key={post.id} />
          // )
        })
      }
    </>
  )
}

export default PostList
