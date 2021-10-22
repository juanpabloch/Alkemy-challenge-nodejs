const { DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const Genre = sequelize.define("genre", {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
    timestamps: false //previene que se cree createdAt y updatedAt automaticamente
})

module.exports = Genre