const express=require('express');
const CancionControl=require('../control/cancionControl');
//importar multiparty
const multipart=require('connect-multiparty');
const subirMusicaDirectorio=multipart({uploadDir:'./archivos/canciones'});

var api=express.Router();
//ruta registro de cancion
api.post('/subir',CancionControl.registroCancion);
//ruta cancion
api.put('/subirCancion/:id',subirMusicaDirectorio,CancionControl.subirCancion);
//ruta reproducir cancion
api.get('/playMusic/:musicFile', CancionControl.reproducirMusica);
//ruta imagen de cancion
api.put('/subirImgCancion/:id',subirMusicaDirectorio,CancionControl.subirImgC);
//ruta mostrar img de canción
api.get('/obtenerImgCancion/:musicFile', CancionControl.mostrarArchivoImg);

//Exportar l RUTA
module.exports=api;