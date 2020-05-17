const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'asistentes',
    {
        correo: {
            type: Sequelize.STRING,
            primaryKey: true,
            
        },
        nombre:{
            type: Sequelize.STRING,

        },
        cedula: {
            type: Sequelize.STRING
        }
    },

    {
        timestamps: false,
        freezeTableName: true

    }

)