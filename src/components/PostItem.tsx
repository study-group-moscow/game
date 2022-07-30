import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Controller } from 'react-hook-form';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPost } from '../models/IPosts';
import { useDeletePostMutation } from '../services/PostsService';

type TPostItemProps = {
  post: IPost;
  index: number;
  remove: any;
  control: any;
}

const PostItem = ({ post, remove, index, control }: TPostItemProps) => {
  const [deletePost] = useDeletePostMutation();

  return (
    <Card
      key={post.id}
      sx={{
        maxWidth: 1000,
        marginTop: '10px'
      }}
    >

      <CardHeader
        title={`${post.name}`}
        action={(
          <IconButton
            onClick={() => {
              deletePost(post.post_id)
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
          {post.content}
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
  )
}

export default PostItem
