//creamos un archivo para colocar las asociaciones
//en este caso creamos una relacion many to many
const Movies = require('./moviesModels');
const Characters = require('./charactersModels');

//personajes pertenece a varias Movies
//esto crea una nueva tabla llamada movie_character 
//agrega funciones: Personaje.addMovies, Personaje.getMovies 
Characters.belongsToMany(Movies, {
    through: "movie_character",
    timestamps: false
})

//Moviess pertenece a varios personajes
//esto crea na nueva tabla llamada movie_character 
//agrega funciones: Movies.addPersonaje, Movies.getPersonaje 
// Movies.belongsToMany(Personaje, {through: "movie_character"})
Movies.belongsToMany(Characters, {
    through: "movie_character", 
    timestamps: false
})