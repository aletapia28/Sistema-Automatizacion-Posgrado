const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'periodos',
    {
        periodo: {
            type: Sequelize.STRING,
            primaryKey: true,
            
        },
        fechaInicio: {
            type: Sequelize.DATE
        },
        fechaCierre: {
            type: Sequelize.DATE

        }
    },

    {
        timestamps: false,
        freezeTableName: true

    }

)