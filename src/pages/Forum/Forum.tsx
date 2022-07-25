import React, { useState } from 'react';
import { Button } from '@mui/material';

interface IChat {
  id: string;
  title: string;
}

const Forum = () => {
  const [chats, setChats] = useState<IChat[]>([]);

  return (
    <div style={{ marginTop: '100px', marginLeft: '100px' }}>
      <h1>Forum test</h1>
      <Button onClick={() => {
        setChats([
          { id: '1', title: 'test1' },
          { id: '2', title: 'test2' }
        ])
      }}
      >
        Создать чат
      </Button>

      {
        chats.map((chat) => (
          <div onClick={() => {}}>
            <span>{chat.title}</span>
          </div>
        ))
      }

    </div>
  );
}

export default Forum;
