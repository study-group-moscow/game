import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useAddPostMutation } from '../../services/PostsService';
import { useFetchUserQuery } from '../../services/AuthServices';
import { IPost } from '../../models/IPosts';
import PostList from '../PostList';

export type FormValues = {
  message: string;
  posts: IPost[];
};

const Form = ({ posts }: { posts: IPost[] }) => {
  const { data: user } = useFetchUserQuery(undefined, { skip: false });
  const [addPost] = useAddPostMutation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { message: '', posts },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormValues) => {
    // console.log('data');
    // console.log(data);
  }

  const handleSavePost = async () => {
    const newPost = {
      content: watch('message') ?? '',
      likes: [],
      islike: false,
      user_id: user?.id ?? 1
    }

    await addPost(newPost)
      .unwrap()
      .then((post) => {
        reset({
          message: '',
          posts: [...watch('posts'), post]
        })
      });
  }

  return (
    <div style={{ marginBottom: '50px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PostList control={control} />
        <Controller
          name='message'
          control={control}
          defaultValue='like'
          rules={{ required: true }}
          render={({ field }) => <TextField autoFocus fullWidth multiline {...field} />}
        />
        <Button
          onClick={handleSavePost}
        >
          добавить пост
        </Button>
      </form>
    </div>
  );
}
export default Form;
