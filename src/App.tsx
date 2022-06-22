import React, { lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { RouterLinks } from './utils/consts';

import NotFound from './utils/NotFound';
import './App.scss';

const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'))
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login/Login'))
const Loader = lazy(() => import(/* webpackChunkName: "Loader" */ './components/Loader/Loader'))
const PrivateRoute = lazy(() => import(/* webpackChunkName: "PrivateRoute" */ './utils/PrivateRoute'))

const App = () => (
  <div className='App'>
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

        <Route path={RouterLinks.ERROR} element={<PrivateRoute />}>
          <Route index element={(<div>Error</div>)} />
        </Route>

        <Route path='*' element={(<NotFound />)} />
      </Routes>
    </Suspense>
  </div>
)

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
