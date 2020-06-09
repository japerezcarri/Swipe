const express = require('express');
const app = express();

// Declaración de cors
const cors = require('cors');

// Declaración de la constante delas rutas de usuarios
const usuarioRutas = require('./rutas/usuarioRutas');


// -- MIDDLEWARES --
app.use(express.json());
app.use(cors());

// Consumo de rutas
app.use('/api', usuarioRutas)

// --FIN MIDDLEWARES --

// Exportación del modulo
module.exports = app;
