import React from 'react';
import Form from '../../components/Form/Form';
import Loader from '../../components/Loader/Loader';
import { useGetPostsQuery } from '../../services/PostsService';

const Forum = () => {
  const { data: posts, isLoading } = useGetPostsQuery(1);

  if (isLoading) return (<Loader />)

  return (
    <div style={{ marginTop: '100px', marginLeft: '100px', padding: '10px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '1000px' }}>
        <Form posts={posts} />
      </div>
    </div>
  );
}

export default Forum;
