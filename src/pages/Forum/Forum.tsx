import React from 'react';
import FormForum from '../../components/FormForum/FormForum';
import PostList from '../../components/PostList';
import './Forum.scss'

const Forum = () => (
  <div className='container'>
    <div className='content'>
      <PostList />
      <FormForum />
    </div>
  </div>
)

export default Forum;
