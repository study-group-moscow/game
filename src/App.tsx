import React, { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import About from './pages/About/About';
import Home from './pages/Home/Home'
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Loader from './components/Loader/Loader'
import PrivateRoute from './utils/PrivateRoute'
import CustomAlert from './components/Alert/CustomAlert'

import { RouterLinks } from './constants/constants';

import NotFound from './utils/NotFound';
import app from './App.module.scss';

const App = () => (
  <div className={app.app}>
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
          <Route index element={(<div>Game</div>)} />
        </Route>

        <Route path={RouterLinks.PROFILE} element={<PrivateRoute />}>
          <Route index element={(<div>Profile</div>)} />
        </Route>

        <Route path={RouterLinks.FORUM} element={<PrivateRoute />}>
          <Route index element={(<div>Forum</div>)} />
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
  </div>
)

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
