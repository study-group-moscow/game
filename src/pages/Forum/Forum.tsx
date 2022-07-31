import React from 'react';
import Form from '../../components/Form/Form';
import PostList from '../../components/PostList';

const Forum = () => (
  <div style={{ marginTop: '100px', marginLeft: '100px', padding: '10px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '1000px' }}>
      <PostList />
      <Form />
    </div>
  </div>
)

export default Forum;
