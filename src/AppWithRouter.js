// src/AppWithRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importar las rutas
import App from './App'; // Componente principal de login
import Dashboard from './Dashboard'; // Componente del Dashboard

function AppWithRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} /> {/* Ruta para la página de login */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para el Dashboard */}
    </Routes>
  );
}

export default AppWithRouter;
