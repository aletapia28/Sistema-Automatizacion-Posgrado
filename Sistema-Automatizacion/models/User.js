const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'usuario',
    {
        correo: {
            type: Sequelize.STRING,
            primaryKey: true,
            
        },
        password: {
            type: Sequelize.STRING
        }
    },

    {
        timestamps: false

    }

)