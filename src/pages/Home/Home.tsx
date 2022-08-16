import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import {
  useFetchLogoutMutation,
  useFetchSignInOauthMutation
} from '../../services/AuthServices';
import '../../styles/centerContent.scss'
import { RouterLinks } from '../../constants/constants'

const Home:React.FC = () => {
  const location = useLocation();
  const [fetchLoginOauth, { data: signInOauth }] = useFetchSignInOauthMutation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code')

    if (code && (signInOauth !== 'OK')) {
      fetchLoginOauth({ code, redirect_uri: process.env.REDIRECT_URI ?? '' })
    }
  }, [signInOauth])

  const [fetchLogout] = useFetchLogoutMutation();
  const navigate = useNavigate()

  const logout = async () => {
    await fetchLogout()
    navigate(RouterLinks.LOGIN)
  }

  const navigateToGamePage = () => {
    navigate(RouterLinks.GAME)
  }

  return (
    <div className='center'>
      <Button onClick={navigateToGamePage}>
        Играть
      </Button>

      <Button onClick={logout}>
        Выход
      </Button>
    </div>
  )
}

export default Home
