import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes, useLocation } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import useGetLocalDbUser from './hooks/useGetLocalDbUser'
import { dark, light } from './constants/themes'

import { RouterLinks } from './constants/constants';

import NotFound from './utils/NotFound';
// import './App.scss';

import About from './pages/About/About'
import Game from './pages/Game/GamePage'
import Home from './pages/Home/Home'
import Forum from './pages/Forum/Forum'
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Profile from './pages/Profile/Profile'
import PrivateRoute from './utils/PrivateRoute'
import CustomAlert from './components/Alert/CustomAlert'

const App = () => {
  // чтение юзера с темой из локальной БД
  const location = useLocation();
  const isNonPrivateRoute = ['/login', '/registration', '/'].includes(location.pathname)
  const localDbUser = useGetLocalDbUser({ skip: isNonPrivateRoute })
  const theme = localDbUser?.theme === 'dark' ? dark : light

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path={RouterLinks.LOGIN} element={<Login />} />
          <Route path={RouterLinks.REGISTRATION} element={<Registration />} />

          <Route path={RouterLinks.HOME} element={<PrivateRoute />}>
            <Route index element={(<Home />)} />
          </Route>

          <Route path={RouterLinks.ABOUT} element={<PrivateRoute />}>
            <Route index element={(<About />)} />
          </Route>

          <Route path={RouterLinks.GAME} element={<PrivateRoute />}>
            <Route index element={(<Game />)} />
          </Route>

          <Route path={RouterLinks.PROFILE} element={<PrivateRoute />}>
            <Route index element={(<Profile />)} />
          </Route>

          <Route path={RouterLinks.FORUM} element={<PrivateRoute />}>
            <Route index element={(<Forum />)} />
          </Route>

          <Route path={RouterLinks.LEADERBOARD} element={<PrivateRoute />}>
            <Route index element={(<Leaderboard />)} />
          </Route>

          <Route path={RouterLinks.ERROR} element={<PrivateRoute />}>
            <Route index element={(<div>Error</div>)} />
          </Route>

          <Route path='*' element={(<NotFound />)} />
        </Routes>

        <CustomAlert />

      </ThemeProvider>
    </div>
  )
}

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
