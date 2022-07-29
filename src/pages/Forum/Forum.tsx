import React, { useEffect, useState } from 'react';
import Form from '../../components/Form/Form';
import Loader from '../../components/Loader/Loader';
import { IPost } from '../../models/IPosts';
import { useGetPostsQuery } from '../../services/PostsService';

const Forum = () => {
  const { data, isLoading, isSuccess } = useGetPostsQuery('');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('http://localhost:8989/post')
      .then((response) => response.json())
      .then((date) => {
        setPosts(date)
        setLoading(false)
      })
  }, [])

  if (loading) return (<Loader />)

  return (
    <div style={{ marginTop: '100px', marginLeft: '100px', padding: '10px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '1000px' }}>
        <Form posts={posts} />
      </div>
    </div>
  );
}

export default Forum;
