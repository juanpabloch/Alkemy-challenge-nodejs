const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')


const Characters = sequelize.define("characters", {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.DOUBLE
    },
    history: {
        type: DataTypes.STRING(999),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})


module.exports = Characters