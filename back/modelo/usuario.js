const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Objeto Schema
var UsuarioSchema = new Schema({
    // se  ponen todos estos datos como estructura pero es opcional usarlos
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    rol: String,
    imagen: String
    /* telefono: Number,
    fecha: String */
})

// Exportar el modelo
module.exports = mongoose.model('Usuario', UsuarioSchema);



