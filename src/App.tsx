import React, { lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { RouterLinks } from './utils/consts';

import { NotFound } from './utils/NotFound';
import styles from './app.module.scss';
import { PrivateRoute } from './utils/PrivateRoute';

const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'))
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login/Login'))

const App = () => (
  <div className={styles.app}>
    <CssBaseline />

    <Suspense fallback={<div>Loading...</div>}>

      <Routes>

        {/* <Route */}
        {/*  path={RouterLinks.REGISTRATION} */}
        {/*  element={( */}
        {/*    <PrivateRoute */}
        {/*      element={<Registration />} */}
        {/*    /> */}
        {/*  )} */}
        {/* /> */}
        <Route
          path={RouterLinks.LOGIN}
          element={<Login />}
        />

        <Route path='*' element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>

        {/* <Route path={RouterLinks.ABOUT} element={<About />} /> */}
        {/* <Route */}
        {/*  path='/game' */}
        {/*  element={ */}
        {/*    <PrivateRoute element={<div>Game</div>} /> */}
        {/*    } */}
        {/* /> */}
        {/* <Route */}
        {/*  path='/error' */}
        {/*  element={ */}
        {/*    <PrivateRoute element={<div>Error</div>} /> */}
        {/*  } */}
        {/* /> */}
        {/* <Route */}
        {/*  path={RouterLinks.HOME} */}
        {/*  element={ */}
        {/*    <PrivateRoute element={<Home />} /> */}
        {/*  } */}
        {/* /> */}
        {/* <Route path='*' element={(<NotFound />)} /> */}
      </Routes>
    </Suspense>
  </div>
)

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>
})
