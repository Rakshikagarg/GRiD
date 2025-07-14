import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 18 with TypeScript
const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found. Make sure there's an element with id='root' in your HTML.");
}

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure performance
reportWebVitals(console.log);
