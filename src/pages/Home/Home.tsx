import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import styles from './home.module.scss'
import { useFetchLogoutMutation } from '../../services/AuthServices';

const Home:React.FC = () => {
  const [fetchLogout] = useFetchLogoutMutation();

  const handleLogout = () => {
    fetchLogout('')
  }
  return (
    <>
      <div className={styles.active}>Home</div>
      <Button
        variant='contained'
        color='success'
        endIcon={<SendIcon />}
        onClick={handleLogout}
      >
        This is my home!
      </Button>
    </>
  )
}

export default Home
