// src/App.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Importa el contexto de usuario
import axios from 'axios'; // Agrega esta línea para importar axios
import LoginWithSteam from './LoginWithSteam';

function App() {
  const { user, setUserData } = useUser();  // Usa el contexto para obtener y setear el usuario
  const navigate = useNavigate();  // Para redirigir al Dashboard

  useEffect(() => {
    // Obtener los parámetros de la URL (como userData)
    const urlParams = new URLSearchParams(window.location.search);
    const userDataString = urlParams.get('userData');

    if (userDataString) {
      // Parsear los datos del usuario de la URL
      const parsedUserData = JSON.parse(decodeURIComponent(userDataString));
      setUserData(parsedUserData);  // Almacena el usuario en el contexto

      // Redirigir al Dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, setUserData]);

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUserData(response.data);  // Almacena los datos del usuario
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  };

  return (
    <div className="App">
      <h1>Bienvenido a la Steam Login App</h1>
      {user ? (
        <div>
          <h2>{user.message}</h2>
          <img src={user.avatar} alt="Avatar" width={100} />
        </div>
      ) : (
        <div>
          <LoginWithSteam onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
