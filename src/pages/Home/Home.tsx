import React, { useCallback } from 'react';
import './Home.scss'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useFetchLogoutMutation } from '../../services/AuthServices';
import { RouterLinks, RouterLinksName } from '../../constants/constants';

const Home:React.FC = () => {
  const [fetchLogout] = useFetchLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetchLogout();
    navigate(RouterLinks.LOGIN);
  }

  const goGame = useCallback(() => {
    navigate('/game')
  }, [])

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
