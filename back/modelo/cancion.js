const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Objeto
var CancionShema= new Schema({
    titulo: String,
    artista: String,
    genero: String,
    album: String,
    anio: Number,
    letra: String,
    imagenc:String,
    reprod: Number,
    archivo:String,
    

});

//Exportar
module.exports=mongoose.model('Cancion',CancionShema);
