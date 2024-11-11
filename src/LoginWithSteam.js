// src/LoginWithSteam.js
import React from 'react';

function LoginWithSteam({ onLogin }) {
  return (
    <div>
      <button onClick={() => window.location.href = 'http://localhost:5000/auth/steam'}>
        Iniciar sesión con Steam
      </button>
    </div>
  );
}

export default LoginWithSteam;
