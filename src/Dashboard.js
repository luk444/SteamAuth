// src/Dashboard.js
import React from "react";
import { useUser } from './UserContext';  // Importa el contexto de usuario

const Dashboard = () => {
  const { user } = useUser();  // Obtiene el usuario desde el contexto

  if (!user) {
    // Si no hay datos, redirigir al login
    window.location.href = '/';
    return null;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">{`¡Hola, ${user.message}!`}</h2>
      <p className="text-lg text-gray-500 mb-4">Tu ID de usuario es: {user.userId}</p>
    </div>
  );
};

export default Dashboard;
