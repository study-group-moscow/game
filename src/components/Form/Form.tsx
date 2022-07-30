import * as React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddPostMutation, useDeletePostMutation } from '../../services/PostsService';
import { useFetchUserQuery } from '../../services/AuthServices';
import { IPost } from '../../models/IPosts';

type FormValues = {
  message: string;
  posts: IPost[];
};

const Form = ({ posts }: { posts: IPost[] }) => {
  const { data: user } = useFetchUserQuery(undefined, { skip: false });
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();

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

  const {
    fields,
    remove
  } = useFieldArray({
    name: 'posts',
    control
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
          posts: [post, ...watch('posts')]
        })
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='message'
          control={control}
          defaultValue='like'
          rules={{ required: true }}
          render={({ field }) => <TextField fullWidth multiline {...field} />}
        />
        <Button
          onClick={handleSavePost}
        >
          добавить пост
        </Button>
        {fields.map((field, index) => (
          <Card
            key={field.id}
            sx={{
              maxWidth: 1000,
              marginTop: '10px'
            }}
          >

            <CardHeader
              title={`${field.name}`}
              action={(
                <IconButton
                  onClick={() => {
                    deletePost(field.post_id)
                    remove(index)
                  }}
                  aria-label='settings'
                >
                  <DeleteIcon />
                </IconButton>
                )}
            />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                {field.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div>
                <Controller
                  name={`posts.${index}.islike`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Checkbox
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={(<FavoriteIcon />)}
                      {...field}
                    />
                  )}
                />
                {15}
              </div>
            </CardActions>
          </Card>
        ))}
      </form>
    </div>
  );
}
export default Form;
