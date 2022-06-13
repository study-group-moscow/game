import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from './store/store';
import App from './App';
import '@fontsource/graduate'
import CustomAlert from './components/Alert/CustomAlert';

const container = document.getElementById('root');
const root = createRoot(container);

const store = createStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <CustomAlert />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
