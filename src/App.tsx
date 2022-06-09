import React, { Suspense, lazy, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { RouterLinks } from './utils/consts';
import { useAppDispatch } from './hooks/redux';
import { useFetchUserMutation } from './services/AuthServices';

// как пример...
const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'))
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login/Login'))

const App = () => {
  const [fetchUser, { data, isLoading }] = useFetchUserMutation();
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchUser('');
  }, [])

  // useEffect(() => {
  //   fetchUser('');
  // }, [data])

  console.log(data)

  return (
    <div className='App' style={{ height: '100vh' }}>
      <CssBaseline />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {
            !data
              ? (
                <>
                  <Route path={RouterLinks.REGISTRATION} element={<Registration />} />
                  <Route path={RouterLinks.LOGIN} element={<Login />} />
                </>
              )
              : (
                <>
                  <Route path={RouterLinks.ABOUT} element={<About />} />
                  <Route path='/game' element={<div>Game</div>} />
                  <Route path='/error' element={<div>Error</div>} />
                  <Route path={RouterLinks.HOME} element={<Home />} />
                </>
              )
          }
          <Route path='*' element={<div>NotFound</div>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
