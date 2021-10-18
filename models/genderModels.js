const { DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const Gender = sequelize.define("gender", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    imagen: {
        type: DataTypes.STRING
    },
}, {
    // Other model options go here
    timestamps: false //previene que se cree createdAt y updatedAt automaticamente
})

module.exports = Gender