const Cancion=require('../modelo/cancion');
const fs=require('fs');
const path=require('path');

/* FUNCIONES */
function registroCancion(req,res){
    var cancion=new Cancion;
    var parametros=req.body;
    cancion.titulo=parametros.titulo;
    cancion.artista=parametros.artista;
    cancion.genero=parametros.genero;
    cancion.album=parametros.album;
    cancion.anio=parametros.anio;
    cancion.letra=parametros.letra;
    cancion.reprod=0;

    //Guardar en BD
    cancion.save((err,cancionNueva)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionNueva){
                res.status(200).send({message:"No fue posible subir la canción"});
            }else{
                res.status(200).send({message:`Ahora puedes disfrutar de ${cancion.titulo}.`})
            }
        }
    });

}

//subir archivo de musica
function subirCancion(req,res){
    var cancionId=req.params.id;
    var nombreArchivo="No has subido ningúna canción";
    //validación de archivo
    if(req.files){
        var rutaArchivo=req.files.archivo.path;
        console.log(`ruta Archivo: ${rutaArchivo}`);
        //split
        var partirArchivo=rutaArchivo.split('\\');
        //Acceder a la posicion que contiene el nombre de la cancion
        var nombreArchivo=partirArchivo[2];
        //split
        var extensionMusica=nombreArchivo.split('\.');
        //Acceder a la posicion de extension del aarchivo
        var extensionArchivo=extensionMusica[1];
        //mostrar en consola
        console.log(` partir archivo ${partirArchivo}, ${nombreArchivo}, extension: ${extensionMusica}, ${extensionArchivo}` );

        //Validación de formato
        if(extensionArchivo=='wmv'|| extensionArchivo=='mp3'){
            //Actualizar el campo archivo
            Cancion.findByIdAndUpdate(cancionId,{archivo:nombreArchivo},(err,cancionArriba)=>{
                if(err){
                    res.status(500).send({message:"Error en el servidor"});
                }else{
                    res.status(200).send({
                        message:"Canción ahora desponible",
                        archivo: nombreArchivo,
                        cancion: cancionArriba
                    });
                }
            });
        }else{
            //formato no valido
            res.status(200).send({message:"Formato inválido"})
        }
    }else{
        res.status(200).send({message: "No has subido ningún archivo de música."});
    }

}

//mostrar archivo
function reproducirMusica(req,res){
    //pedir el archivo a mostrar
    var archivo=req.params.musicFile;
    //ubicacion del archivo
    var ruta='./archivos/canciones/'+archivo;
    //validar si existe o no fs.exists('ruta,(existencia)=>')
    fs.exists(ruta,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "canción no encontrada"});
        }
    });
   
}
//Funciones para mostrar imagen de la canción
//funcion subir imagen
function subirImgC(req,res){
    var usuarioId= req.params.id;
    var nombreArchivo="No has subido ninguna imagen....";
    /* validar si se esta enviando archivo*/
    if(req.files){
        var rutaArchivo= req.files.imagen.path;
        //haremos split para separar elementos 
        var partirArchivo=rutaArchivo.split('\\');
        //Acceder a la posicion que contiene el nombre del archivo
        var nombreArchivo=partirArchivo[2];
        //split para separa nombre de archivo de la extension
        var extensionImg=nombreArchivo.split('\.');
        //Acceder a la posicion de la extensión del archivo
        var extensionArchivo=extensionImg[1];
        //mostrar en consola
        console.log(`ruta: ${rutaArchivo}, particion: ${partirArchivo}, nombre Archivo: ${nombreArchivo} Extensión Archivo: ${extensionArchivo}`);
        
        //validar si el formato del archivo es aceptable
        if(extensionArchivo=='png'|| extensionArchivo=='jpg'){
            //Actualizar el campo imagen
            Cancion.findByIdAndUpdate(cancionId,{imagenc: nombreArchivo}, (err,imagenCancion)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    res.status(200).send({
                        message: "Imagen anexada!",
                        imagenc: nombreArchivo,
                        cancion: imagenCancion
                    });
                }
            });
        }else{
            //Formato no valido
            res.status(200).send({message:"Formato inválido: El archivo no es una imagen"});
        }
    }else{
        res.status(200).send({message: "No has subido imagenes"});
    }
}

//funcion mostrar archivo
function mostrarArchivoImg(req,res){
    //pedir el archivo a mostrar
    var archivo=req.params.imageFile;
    //ubicacion del archivo
    var ruta='./archivos/canciones/'+archivo;
    //validar si existe o no fs.exists('ruta,(existencia)=>')
    fs.exists(ruta,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "imagen no encontrada"});
        }
    });
   
}
//exportar 
module.exports={
    registroCancion,
    subirCancion, 
    reproducirMusica,
    subirImgC,
    mostrarArchivoImg
}