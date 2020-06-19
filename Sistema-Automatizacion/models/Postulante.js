const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'postulantes',
    {
        cedula: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        genero: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        nombre: {
            type: Sequelize.STRING
        },
        telefono1: {
            type: Sequelize.STRING
        },
        telefono2: {
            type: Sequelize.STRING
        },
        correo1: {
            type: Sequelize.STRING
        },
        correo2: {
            type: Sequelize.STRING
        },
        ingles: {
            type: Sequelize.TINYINT
        },
        gradoAcademico: {
            type: Sequelize.STRING
        },
        universidad: {
            type: Sequelize.STRING
        },
        afinidad: {
            type: Sequelize.STRING
        },
        acreditada: {
            type: Sequelize.TINYINT
        },
        puestoActual: {
            type: Sequelize.STRING
        },
        experienciaProfesion: {
            type: Sequelize.INTEGER
        },
        cursoAfin: {
            type: Sequelize.INTEGER
        },
        tituloTecnico: {
            type: Sequelize.TINYINT
        },
        cursoAprovechamiento: {
            type: Sequelize.INTEGER
        },
        tituloDiplomado: {
            type: Sequelize.TINYINT
        },
        promedioGeneral: {
            type: Sequelize.DOUBLE
        }
    },

    {
        timestamps: false,
        freezeTableName: true

    }

)