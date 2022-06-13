import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import styles from './home.module.scss'
import { useFetchLogoutMutation } from '../../services/AuthServices';
import { setCredentials } from '../../store/reducers/AuthSlice';
import { RouterLinksName } from '../../utils/consts';

const Home:React.FC = () => {
  const [fetchLogout] = useFetchLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetchLogout('')
    dispatch(setCredentials(null))
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
