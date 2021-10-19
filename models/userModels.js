const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const User = sequelize.define("users", {
    userName:{
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(90),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(70),
        allowNull: false
    }
},{
    timestamps: false //previene que se cree createdAt y updatedAt automaticamente
})

module.exports = User