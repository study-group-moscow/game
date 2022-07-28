import * as React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, CardMedia, Checkbox, IconButton, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

type FormValues = {
  message: string;
  cart: {
    id: number;
    name: string;
    date: string;
    text: string;
    isLike: boolean;
    count: number;
  }[];
};

const Form = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      message: 'like',
      cart: [{
        id: 1,
        name: 'Петров Владимир',
        date: 'September 14, 2016',
        text: 'Привет.',
        isLike: false,
        count: 8
      }]
    },
    mode: 'onBlur'
  });
  const {
    fields,
    append,
    prepend,
    remove
  } = useFieldArray({
    name: 'cart',
    control
  });
  const onSubmit = (data: FormValues) => {
    console.log('data');
    console.log(data);
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
            prepend({
              id: 1,
              name: 'Петров Владимир',
              date: 'September 14, 2016',
              text: watch('message'),
              count: 8
            })
            reset({
              message: '',
              cart: watch('cart')
            })
          }}
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
              title={field.name}
              subheader={field.date}
              action={(
                <IconButton aria-label='settings'>
                  <DeleteIcon onClick={() => remove(index)} />
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
                {field.text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div>
                <Controller
                  name={`cart.${index}.isLike`}
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
                {field.count}
              </div>
            </CardActions>
          </Card>
        ))}
      </form>
    </div>
  );
}
export default Form;
