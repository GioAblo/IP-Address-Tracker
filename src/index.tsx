import React from 'react'
// import ReactDOM from 'react-dom/client'
import {createRoot} from 'react-dom/client';
import App from './app';
import './index.css';

const root = createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
   <App />
  </React.StrictMode>
  );
