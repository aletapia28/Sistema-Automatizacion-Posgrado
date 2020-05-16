const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'superusuario',
    {
        correo: {
            type: Sequelize.STRING,
            primaryKey: true,
            
        },
        correoenvio: {
            type: Sequelize.STRING
        }
    },

    {
        timestamps: false,
        freezeTableName: true

    }

)