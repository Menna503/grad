
import { createRoot } from 'react-dom/client'; 
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();