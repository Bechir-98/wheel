import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') || document.getElementById('welcome')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);