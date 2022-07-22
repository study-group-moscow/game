import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {
  useFetchLogoutMutation,
  useFetchSignInOauthMutation
} from '../../services/AuthServices';
import './Home.scss'
import styles from '../../styles/centerContent.module.scss'
import { RouterLinks } from '../../constants/constants'

const Home:React.FC = () => {
  const [fetchLoginOauth, { data: signInOauth }] = useFetchSignInOauthMutation();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

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

  const goPlay = () => {
    navigate(RouterLinks.PROFILE)
  }

  return (
    <div className={styles.center}>
      <Button onClick={goPlay}>
        Играть
      </Button>

      <Button onClick={logout}>
        Выход
      </Button>
    </div>
  )
}

export default Home
