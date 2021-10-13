const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')
const Genero = require('./generoModelo')

const Pelicula = sequelize.define("pelicula", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    calificacion:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false //previene que se cree createdAt y updatedAt automaticamente
})


module.exports = Pelicula

//luego de exportar creamos las relaciones entre tablas
//creamos la relacion con la tabla genero, esta relacion belongsTo crea una nueva fila en la tabla peliculas 
//para referenciar a un genero

Pelicula.belongsTo(Genero, {
    foreignKey: "genero_id",
    targetKey: "id"
})