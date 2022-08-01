import React from 'react';
import FormForum from '../../components/FormForum/FormForum';
import PostList from '../../components/PostList/PostList';
import './Forum.scss'

const Forum = () => (
  <div className='container'>
    <div className='content'>
      <FormForum />
      <PostList />
    </div>
  </div>
)

export default Forum;
