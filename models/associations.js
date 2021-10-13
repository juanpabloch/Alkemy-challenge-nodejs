//creamos un archivo para colocar las asociaciones
//en este caso creamos una relacion many to many
const Pelicula = require('./peliculaModelo');
const Personaje = require('./personajeModelo');

//personajes pertenece a varias peliculas
//esto crea una nueva tabla llamada pelicula_personaje 
//agrega funciones: Personaje.addPelicula, Personaje.getPelicula 
Personaje.belongsToMany(Pelicula, {
    through: "pelicula_personaje",
    timestamps: false
})

//peliculas pertenece a varios personajes
//esto crea na nueva tabla llamada pelicula_personaje 
//agrega funciones: Pelicula.addPersonaje, Pelicula.getPersonaje 
// Pelicula.belongsToMany(Personaje, {through: "pelicula_personaje"})
Pelicula.belongsToMany(Personaje, {
    through: "pelicula_personaje", 
    timestamps: false
})