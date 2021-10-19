const { DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const Gender = sequelize.define("gender", {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.STRING
    },
}, {
    // Other model options go here
    timestamps: false //previene que se cree createdAt y updatedAt automaticamente
})

module.exports = Gender