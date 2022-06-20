import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.scss'
import { useFetchLogoutMutation } from '../../services/AuthServices';
import { RouterLinksName } from '../../utils/consts';

const Home:React.FC = () => {
  const [fetchLogout] = useFetchLogoutMutation();
  const navigation = useNavigate();

  const handleLogout = async () => {
    await fetchLogout('');
    navigation('/login')
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
        {RouterLinksName.EXIT}
      </Button>
    </>
  )
}

export default Home
