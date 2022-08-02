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
import { IPost } from '../../models/IPosts';
import { useFetchUserQuery } from '../../services/AuthServices';

type TPostItemProps = {
  post: IPost;
  onRemove: (id: number) => void;
  onUpdate: (post: IPost) => void;
}

const PostItem: FC<TPostItemProps> = ({ post, onRemove, onUpdate }) => {
  const isLike = useMemo(() => !!post.likes.find((value: number) => value === post.id), [post]);
  const { data: user } = useFetchUserQuery(undefined, { skip: false });

  const handleRemove = async (event: React.MouseEvent) => {
    onRemove(post.id);
  }

  const handleUpdate = async (event: React.FormEvent<HTMLInputElement>) => {
    event.stopPropagation();
    try {
      const result: IPost = JSON.parse(JSON.stringify(post));
      if (user) {
        if (isLike) {
          result.likes = result.likes.filter((id: number) => id !== user.id)
        } else {
          result.likes.push(user.id)
        }
        onUpdate(result);
      }
    } catch (e) {
      console.log(e)
    }
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
