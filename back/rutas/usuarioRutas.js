const express = require('express');
const UsuarioControl = require('../control/usuarioControl');
// importar el paquete connect-multiparty
const multipart = require('connect-multiparty');
// A través de connect multiparty , apuntamos a la carpetaque deseemos en que se guarden los archivos
const subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});

var api = express.Router();

// Ruta registrar usuario -> angular url http://localhost:300/api/
api.post('/registro', UsuarioControl.registrarUsuario);

// Ruta Login
api.post('/login', UsuarioControl.login);

// Ruta Actualizar Usuario en postman NO PONER DOS PUNTOS :
api.put('/actualizar-usuario/:id', UsuarioControl.actualizarUsuario);

// Ruta Subir Imagen
api.put('/subirImagen/:id', subirImgDirectorio, UsuarioControl.subirImg)

// Ruta mostrar imagen usuario
api.get('/obtenerImagen/:imageFile', UsuarioControl.mostrarArchivo)

// Exportar el módulo
module.exports = api;

/* 
{ "nombre": "Andrea",
    "apellido": "Sanchez",
    "correo": "a@gmail.com",
    "contrasena": "1234",
}*/