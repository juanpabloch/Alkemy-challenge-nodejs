const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')
const Gender = require('./genderModels')

const Movie = sequelize.define("movie", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false //previene que se cree createdAt y updatedAt automaticamente
})


module.exports = Movie

//luego de exportar creamos las relaciones entre tablas
//creamos la relacion con la tabla genero, esta relacion belongsTo crea una nueva fila en la tabla Movies 
//para referenciar a un genero

Movie.belongsTo(Gender, {
    foreignKey: "genero_id",
    targetKey: "id",
})