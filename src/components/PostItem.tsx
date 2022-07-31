import React, { FC, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPost } from '../models/IPosts';

type TPostItemProps = {
  post: IPost;
  remove: (id: number) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<TPostItemProps> = ({ post, remove, update }) => {
  const isLike = useMemo(() => !!post.likes.find((value: number) => value === post.id), [post]);

  const handleRemove = async (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post.id);
  }

  const handleUpdate = async (event: React.FormEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const result: IPost = JSON.parse(JSON.stringify(post));

    if (isLike) {
      result.likes = result.likes.filter((id: number) => id !== post.id)
    } else {
      result.likes.push(post.id)
    }

    update(result);
  }

  return (
    <Card
      key={post.id}
      sx={{
        maxWidth: 1000,
        marginBottom: '10px'
      }}
    >

      <CardHeader
        title={`${post.first_name}`}
        action={(
          <IconButton
            onClick={handleRemove}
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
          <Checkbox
            checked={isLike}
            icon={<FavoriteBorderIcon />}
            checkedIcon={(<FavoriteIcon />)}
            onChange={handleUpdate}
          />
          {post.likes.length}
        </div>
      </CardActions>
    </Card>
  )
}

export default PostItem
