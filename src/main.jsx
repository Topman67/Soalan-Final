import React from 'react';
import { createRoot } from 'react-dom/client';
import { SimulationProvider } from './context/SimulationContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <SimulationProvider>
    <Dashboard />
  </SimulationProvider>,
);
