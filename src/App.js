import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

const About = lazy(() => import('./pages/About/About.tsx'))

const App = () => (
  <div className="App">
    <h1>Главная</h1>

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/registration" element={<div>Registration</div>} />
        <Route path="login" element={<div>Login</div>} />
        <Route path="/game" element={<div>Game</div>} />
        <Route exact path="/error" element={<div>Error</div>} />
        <Route exact path="/" element={<div>Home</div>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
    </Suspense>
  </div>
)

export default withErrorBoundary(App, {
  fallback: <>Что-то пошло не так.</>,
})
