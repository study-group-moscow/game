import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { useCreatePostMutation } from '../../services/ForumService';
import { useFetchUserQuery } from '../../services/AuthServices';
import { InputName, InputType } from '../../constants/constants';
import './FormForum.scss'

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
    watch
  } = useForm<FormValues>({
    defaultValues: { [InputName.message]: '' },
    mode: 'onBlur'
  });

  const handleSavePost = async () => {
    const newPost = {
      content: watch(InputName.message) ?? '',
      likes: [],
      user_id: user?.id ?? 1
    }

    await createPost(newPost);
    reset({ [InputName.message]: '' });
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
                <TextField autoFocus fullWidth type={InputType.text} multiline {...field} />
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
