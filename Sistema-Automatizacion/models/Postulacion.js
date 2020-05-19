const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'postulaciones',
    {
        periodo: {
            type: Sequelize.STRING,
            primaryKey: true
            
        },
        cedula: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        enfasis: {
            type: Sequelize.STRING

        },
        sede: {
            type: Sequelize.STRING

        },
        nota: {
            type: Sequelize.DOUBLE

        },
        memo: {
            type: Sequelize.TINYINT

        }

    },

    {
        timestamps: false,
        freezeTableName: true

    }

)