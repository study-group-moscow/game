import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useCreatePostMutation } from '../../services/PostsService';
import { useFetchUserQuery } from '../../services/AuthServices';
import PostList from '../PostList';

export type FormValues = {
  message: string;
};

const Form = () => {
  const { data: user } = useFetchUserQuery(undefined, { skip: false });
  const [createPost] = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { message: '' },
    mode: 'onBlur'
  });

  const handleSavePost = async () => {
    const newPost = {
      content: watch('message') ?? '',
      likes: [],
      user_id: user?.id ?? 1
    }

    await createPost(newPost);
    reset({ message: '' });
  }

  return (
    <div style={{ marginBottom: '50px' }}>
      <PostList />
      <form onSubmit={handleSubmit(handleSavePost)}>
        <Controller
          name='message'
          control={control}
          defaultValue='like'
          rules={{ required: true }}
          render={({ field }) => <TextField autoFocus fullWidth multiline {...field} />}
        />
        <Button type='submit'>
          добавить пост
        </Button>
      </form>
    </div>
  );
}
export default Form;
