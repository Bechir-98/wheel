import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // <-- OK
import './index.css';
import App from './App.jsx';


ReactDOM.createRoot(document.getElementById('welcome')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
