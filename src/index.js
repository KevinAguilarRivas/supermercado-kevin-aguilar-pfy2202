import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { InventarioProvider } from './context/InventarioContext';

// HashRouter permite que las rutas funcionen en GitHub Pages (sitio estático)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </HashRouter>
  </React.StrictMode>
);
