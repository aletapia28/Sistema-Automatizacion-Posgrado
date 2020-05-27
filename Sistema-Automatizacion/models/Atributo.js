const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'atributos',
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
            
        },
        nombre: {
            type: Sequelize.STRING,
        },
        peso: {
            type: Sequelize.STRING

        }
        

    },

    {
        timestamps: false,
        freezeTableName: true

    }

)