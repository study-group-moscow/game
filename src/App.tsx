import React, { lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Route, Routes, useLocation } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchUserQuery } from './services/AuthServices';
import { useGetOneUserQuery } from './services/ForumService';

import { RouterLinks } from './constants/constants';

import NotFound from './utils/NotFound';
import './App.scss';

const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About'))
const Game = lazy(() => import(/* webpackChunkName: "GamePage" */ './pages/Game/GamePage'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'))
const Forum = lazy(() => import(/* webpackChunkName: "Forum" */ './pages/Forum/Forum'))
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login/Login'))
const Leaderboard = lazy(() => import(/* webpackChunkName: "Leaderboard" */ './pages/Leaderboard/Leaderboard'))
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile/Profile'))
const Loader = lazy(() => import(/* webpackChunkName: "Loader" */ './components/Loader/Loader'))
const PrivateRoute = lazy(() => import(/* webpackChunkName: "PrivateRoute" */ './utils/PrivateRoute'))
const CustomAlert = lazy(() => import(/* webpackChunkName: "CustomAlert" */ './components/Alert/CustomAlert'))

const light = createTheme({
  palette: {
    mode: 'light'
  }
})

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#76adff'
    },
    background: {
      paper: '#385176',
      default: '#385176'
    }
  }
})

const App = () => {
  // чтение юзера с темой из локальной БД
  const location = useLocation();
  const isNonPrivateRoute = ['/login', '/registration', '/'].includes(location.pathname)

  const {
    data: user,
    isSuccess: isSuccessYandex
  } = useFetchUserQuery(undefined, { skip: isNonPrivateRoute });

  const { data: userWithTheme } = useGetOneUserQuery(isSuccessYandex ? user.id : skipToken);

  const themeGetter = userWithTheme?.theme === 'dark' ? dark : light

  return (
    <div className='app'>
      <ThemeProvider theme={themeGetter}>
        <CssBaseline />

        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </ThemeProvider>
    </div>
  )
}

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
