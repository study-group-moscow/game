import React from 'react';
import { Grid } from '@mui/material';
import FormForum from '../../components/FormForum/FormForum';
import PostList from '../../components/PostList/PostList';
import './Forum.scss'

const Forum = () => (
  <div className='container-forum'>
    <Grid className='content-forum' container spacing={2}>
      <Grid item xs={12}>
        <FormForum />
      </Grid>
      <Grid item xs={12}>
        <PostList />
      </Grid>
    </Grid>
  </div>
)

export default Forum;
