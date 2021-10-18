const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')


const Characters = sequelize.define("characters", {
    nombre: {
        type: DataTypes.STRING(60),
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


module.exports = Characters