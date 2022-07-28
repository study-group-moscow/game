import React from 'react';
import Form from '../../components/Form/Form';

export interface IChat {
  id: number;
  name: string;
  date: string;
  text: string;
  count: number;
}

const Forum = () => {
  return (
    <div style={{ marginTop: '100px', marginLeft: '100px', padding: '10px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '1000px' }}>
        <Form />
      </div>
    </div>
  );
}

export default Forum;
