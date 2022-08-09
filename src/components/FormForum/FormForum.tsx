import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { useCreatePostMutation } from '../../services/ForumService';
import { useFetchUserQuery } from '../../services/AuthServices';
import { InputName, InputType } from '../../constants/constants';
import './FormForum.scss'
import schema from './schema';

export type FormValues = {
  [InputName.message]: string;
};

const FormForum = () => {
  const { data: user } = useFetchUserQuery(undefined, { skip: false });
  const [createPost] = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { [InputName.message]: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const handleSavePost = async () => {
    const message = watch(InputName.message);
    const newPost = {
      content: message ?? '',
      likes: [],
      user_id: user?.id ?? 1
    }

    if (message !== '') {
      await createPost(newPost);
      reset({ [InputName.message]: '' });
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(handleSavePost)}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Controller
              name={InputName.message}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  type={InputType.text}
                  multiline
                  {...field}
                  error={Boolean(errors?.[InputName.message]?.message)}
                  helperText={errors?.[InputName.message]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button type='submit'>
              ДОБАВИТЬ ПОСТ
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
export default FormForum;
