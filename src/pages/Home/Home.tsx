import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.scss'
import { useFetchLogoutMutation } from '../../services/AuthServices';
import { RouterLinksName } from '../../utils/consts';
import { useAppDispatch } from '../../hooks/redux'
import { setCredentials, setLoginStatus } from '../../store/reducers/AuthSlice'

const Home:React.FC = () => {
  const dispatch = useAppDispatch()

  const [fetchLogout] = useFetchLogoutMutation();
  const navigation = useNavigate();

  const handleLogout = async () => {
    await fetchLogout('');
    dispatch(setCredentials(null))
    dispatch(setLoginStatus(false))
    navigation('/login')
  }

  const goGame = () => {
    navigation('/game')
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

      <Button
        variant='contained'
        color='success'
        endIcon={<SendIcon />}
        onClick={goGame}
      >
        TO GAME PROTECTED ROUTE
      </Button>
    </>
  )
}

export default Home
