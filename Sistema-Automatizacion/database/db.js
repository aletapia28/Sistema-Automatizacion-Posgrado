const Sequelize = require('sequelize')

//conexion a la bd 
const db = {}
const sequelize = new Sequelize("sistpostulacion","root","MyNewPass",{
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
