const Usuario = require('../modelo/usuario');

// Importar modulo file system de Node
const fs = require('fs');

// Importar el modulo path de Node
const path = require('path');

// Función Registro Usuario
function registrarUsuario(req, res) {
    var usuario = new Usuario();
    var parametros = req.body;

    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = 'usuario';
    usuario.imagen = null;
  /* usuario.fecha = new Date(); */  

    // Funcion save para interactuar con la DB
    usuario.save((err, usuarioNuevo)=>{
        if (err) {
            res.status(500).send({message: "Error en el servidor"});
        } else {
            if (!usuarioNuevo) {
                res.status(200).send({message: "No fue posible realizar el registro"});
            } else {
                res.status(200).send({
                    message: "Usuario Creado",
                    usuario: usuarioNuevo
                });
            }
        }
    });
}

// Función Login
function login(req, res) {
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    // Funcion findOne para que la db mongo busque un dato
    Usuario.findOne({correo: correoUsuario}, (err, usuarioLogueado)=>{
        if (err) {
            res.status(500).send({message: "Error en el servidor"});
        } else {
            if (!usuarioLogueado) {
                res.status(200).send({message: "Usuario inexistente"});
            } else {
                if (usuarioLogueado.contrasena != contraUsuario) {
                    res.status(200).send({message: "Contraseña incorrecta"});
                } else {
                    res.status(200).send({
                        message: "Usuario Logueado!",
                        usuario: usuarioLogueado
                    });
                }
            }
            
        }
    
    
    });
}

// Función Actualizar Usuario
function actualizarUsuario(req, res) {
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;
 
    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
        if (err) {
            res.status(500).send({message: "Error en el servidor"});
        } else {
            if (!usuarioActualizado) {
                res.status(200).send({message: "no fue posible actualizar tus datos"});
            } else {
                res.status(200).send({
                    message: "Usuario Actualizado!",
                    usuario: nuevosDatosUsuario
                });
            }
        }
    });

}

// Funcion subir Imagen
function subirImg(req, res) {
    var usuarioId = req.params.id;
    var nombreArchivo = "No has subido ninguna imagen...";

    // Validar si efectivamente se está enviando un archivo
    if (req.files) { //esta e el objeto req o peticion se encuentra files, y alli se guardan las imagenes
        // Vamos a ir analizando la ruta del archivo, el nmbre y la extensión
        // c:\\usuarios\descargas\imagen.png    
        var rutaArchivo = req.files.imagen.path;
        console.log(`ruta Archivo: ${rutaArchivo}`);

        // haremos un split para separar los elementos
        // Esto nos generará un arreglo de datos
        var partirArchivo = rutaArchivo.split('\\'); // los backslash dicen a partir de donde se va a partir
        console.log(`partirArchivo: ${partirArchivo}`);

        // Acceder a la posición que contiene el nombre del archivo
        var nombreArchivo = partirArchivo[2];
        console.log(`Posición dato: ${nombreArchivo}`);

        // Haremos un split para separar el nomvre del archivo de la extensión
        // ['imagen', 'png'] 
        var extensionImg = nombreArchivo.split('\.');
        console.log(`PartirImg: ${extensionImg}`);

        // Accedemos a la posición de la extension del archivo
        var extensionArchivo = extensionImg[1];
        console.log(`Estensión del archivo: ${extensionArchivo}`);
        
        // Validar si el formato del archivo es aceptable
        if (extensionArchivo == 'png' || extensionArchivo == 'jpg'){
            // Actualizar del usuario el campo imagen
            Usuario.findByIdAndUpdate(usuarioId, {imagen: nombreArchivo}, (err, usuarioConImg)=>{
                if (err) {
                    res.status(500).send({message: "Error en el servidor"});
                } else {
                    if (!usuarioConImg) {
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    } else {
                        res.status(200).send({
                            message: "Imagen Anexada!",
                            imagen: nombreArchivo,
                            usuario: usuarioConImg
                        
                        });
                    }
                }
            });      
        }else{
            // formato no valido
            res.status(200).send({message: "Formato inválido! El archivo no es una imagen"});
        }
    } else {
        res.status(200).send({message: "No has subido imagenes"});
    }
}


// Función Mostrar Archivo
function mostrarArchivo(req, res){
    // Pedir el archivo que queremos mostrar
    var archivo = req.params.imageFile;
    // Ubicacion del archivo
    var ruta = './archivos/usuarios/'+archivo;

    // Validar si existe o no
    // fs.exists('la ruta del archivo a buscar', (existencia)=>{})
    fs.exists(ruta,(exists)=>{
        if (exists) {
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "Imagen no Encontrada"});
        }
    });
}

// Exportar paquete de funciones
module.exports = {
    registrarUsuario, 
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
}