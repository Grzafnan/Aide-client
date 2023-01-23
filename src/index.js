import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Authprovider from './contexts/AuthProvider/Authprovider';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authprovider>
      <Toaster position='top-center' />
      <App />
    </Authprovider>
  </React.StrictMode>
);

reportWebVitals();
