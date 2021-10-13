const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')


const Personaje = sequelize.define("personaje", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.DOUBLE
    },
    historia: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})


module.exports = Personaje