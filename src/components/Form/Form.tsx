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
  const [addPost, { isLoading, isSuccess, data }] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation()

  // const { posts } = useAppSelector(selectCurrentStatePosts);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      message: '',
      posts
    },
    mode: 'onBlur'
  });
  const {
    fields,
    append,
    prepend,
    remove
  } = useFieldArray({
    name: 'posts',
    control
  });

  const onSubmit = (data: FormValues) => {
    // console.log('data');
    // console.log(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <TextArea name='message' type='text' label='test' /> */}
        <Controller
          name='message'
          control={control}
          defaultValue='like'
          rules={{ required: true }}
          render={({ field }) => <TextField fullWidth multiline {...field} />}
        />
        <Button
          onClick={() => {
            const post = {
              content: watch('message'),
              likes: [],
              isLike: false,
              username: user?.first_name,
              user_id: user?.id
            }
            addPost(post)
            prepend(post)
            reset({
              message: '',
              posts: watch('posts')
            })
          }}
        >
          добавить пост
        </Button>
        {fields.map((field, index) => {
          return (
            <Card
              key={field.id}
              sx={{
                maxWidth: 1000,
                marginTop: '10px'
              }}
            >
              <CardHeader
                title={`${field.username}`}
                action={(
                  <IconButton aria-label='settings'>
                    <DeleteIcon onClick={() => {
                      deletePost(field.idPost ? field.idPost : 1)
                      remove(index)
                    }}
                    />
                  </IconButton>
                )}
              />
              {/* <CardMedia */}
              {/*  component='img' */}
              {/*  height='194' */}
              {/*  image='/static/images/cards/paella.jpg' */}
              {/*  alt='Paella dish' */}
              {/* /> */}
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  {field.content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <div>
                  <Controller
                    name={`posts.${index}.isLike`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={(
                          <FavoriteIcon />
                        )}
                        {...field}
                      />
                    )}
                  />
                  {field.likes.length}
                </div>
              </CardActions>
            </Card>
          )
        })}
      </form>
    </div>
  );
}
export default Form;
