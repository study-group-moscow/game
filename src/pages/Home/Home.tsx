import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import './Home.scss'
import { useFetchLogoutMutation } from '../../services/AuthServices';
import { RouterLinks, RouterLinksName } from '../../utils/consts';

const Home:React.FC = () => {
  const [fetchLogout] = useFetchLogoutMutation();
  const navigation = useNavigate();

  const handleLogout = async () => {
    await fetchLogout('');
    navigation(RouterLinks.LOGIN);
  }

  const goGame = () => {
    navigation('/game')
  }

  return (
    <>
      <div className='Active'>Home</div>
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
