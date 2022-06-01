import React, { Suspense, lazy } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

// как пример...
const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About/About.tsx'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home.tsx'))

const App = () => (
  <div className="App">
    <CssBaseline />

    <h1>Главная</h1>

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/registration" element={<div>Registration</div>} />
        <Route path="login" element={<div>Login</div>} />
        <Route path="/game" element={<div>Game</div>} />
        <Route path="/error" element={<div>Error</div>} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
    </Suspense>
  </div>
)

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>,
})
