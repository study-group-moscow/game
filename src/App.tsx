import React, { lazy, Suspense, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { RouterLinks } from './utils/consts';
import { useFetchUserMutation } from './services/AuthServices';
import { setCredentials } from './store/reducers/AuthSlice';
import { IUserResponse } from './models/IUserResponse';
import { NotFound } from './utils/NotFound';
import styles from './app.module.scss';
import { PrivateRoute } from './utils/PrivateRoute';

// как пример...
const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'))
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login/Login'))

const App = () => {
  const [fetchUser] = useFetchUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const userResponse: IUserResponse = await fetchUser('').unwrap();
    dispatch(setCredentials(userResponse));
    if (!userResponse) {
      navigate(RouterLinks.HOME);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className={styles.app}>
      <CssBaseline />

      <Suspense fallback={<div>Loading...</div>}>

        <Routes>

          <Route
            path={RouterLinks.REGISTRATION}
            element={(
              <PrivateRoute
                isPrivate={false}
                element={<Registration />}
              />
          )}
          />
          <Route
            path={RouterLinks.LOGIN}
            element={(
              <PrivateRoute
                element={<Login />}
                isPrivate={false}
              />
          )}
          />
          <Route path={RouterLinks.ABOUT} element={<About />} />
          <Route
            path='/game'
            element={
              <PrivateRoute element={<div>Game</div>} />
            }
          />
          <Route
            path='/error'
            element={
              <PrivateRoute element={<div>Error</div>} />
          }
          />
          <Route
            path={RouterLinks.HOME}
            element={
              <PrivateRoute element={<Home />} />
          }
          />
          <Route path='*' element={(<NotFound />)} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
