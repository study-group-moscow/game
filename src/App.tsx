import React, { Suspense, lazy } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { RouterLinks } from './utils/consts';

// как пример...
const AppBar = lazy(() => import(/* webpackChunkName: "AppBar" */ './components/AppBar/AppBar'))
const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'))
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login/Login'))

const App = () => (
  <div className='App' style={{ height: '100vh' }}>
    <CssBaseline />

    <AppBar />

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={RouterLinks.ABOUT} element={<About />} />
        <Route path={RouterLinks.REGISTRATION} element={<Registration />} />
        <Route path={RouterLinks.LOGIN} element={<Login />} />
        <Route path='/game' element={<div>Game</div>} />
        <Route path='/error' element={<div>Error</div>} />
        <Route path={RouterLinks.HOME} element={<Home />} />
        <Route path='*' element={<div>NotFound</div>} />
      </Routes>
    </Suspense>
  </div>
)

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
