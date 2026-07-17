import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
 import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Target root mount element missing from index.html configuration mapping blueprint.");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);