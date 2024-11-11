// server.js
const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const dotenv = require('dotenv');

dotenv.config();  // Cargar variables de entorno

const app = express();
const port = 5000;

// Configuración de Passport
passport.use(new SteamStrategy({
    returnURL: `http://localhost:${port}/auth/steam/return`,
    realm: `http://localhost:${port}/`,
    apiKey: process.env.STEAM_API_KEY
  },
  function(identifier, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Configuración de Express
app.use(require('express-session')({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Ruta de autenticación con Steam
app.get('/auth/steam',
  passport.authenticate('steam'));

// Ruta de retorno después de la autenticación
// server.js

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    // El usuario ha iniciado sesión correctamente
    const userData = {
      userId: req.user.id,
      avatar: req.user.avatar,
      message: `¡Hola, ${req.user.displayName}!`
    };

    // Redirigir al frontend (React) con los datos en la URL
    const userDataString = encodeURIComponent(JSON.stringify(userData));
    res.redirect(`http://localhost:3000/dashboard?userData=${userDataString}`);
  });


// Ruta para obtener los datos del usuario autenticado
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      userId: req.user.id,
      avatar: req.user.avatar,
      message: `¡Hola, ${req.user.displayName}!`
    });
  } else {
    res.status(401).json({ message: "No autenticado" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
