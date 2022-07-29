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
import { IPost, IPostRequest } from '../../models/IPosts';

type FormValues = {
  message: string;
  posts: IPost[];
};

const Form = ({ posts }: { posts: IPost[] }) => {
  const { data: user } = useFetchUserQuery(undefined, { skip: false });
  const [addPost] = useAddPostMutation();
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

  async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    return response.json()
  }

  const save = async () => {
    const post = {
      id: 0,
      content: watch('message'),
      likes: [],
      islike: false,
      userId: user?.id
    }

    // const request = new Request('http://localhost:8989/post/', {
    //   method: 'post',
    //   body: JSON.stringify(post),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8'
    //   }
    // })
    //
    // const response = await http<IPostRequest>(request)
    // console.log('response');
    // console.log(response);
    addPost(post)
      .unwrap().then(resp => console.log(resp));

    prepend(post)
    reset({
      message: '',
      posts: watch('posts')
    })
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
          onClick={save}
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
                <IconButton aria-label='settings'>
                  <DeleteIcon onClick={() => {
                    deletePost(field.post_id)
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
                  name={`posts.${index}.islike`}
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
        ))}
      </form>
    </div>
  );
}
export default Form;
