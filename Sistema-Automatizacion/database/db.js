const Sequelize = require('sequelize')
const mysql = require('mysql')
    //conexion a la bd 

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'sisAutomatizacionMGP',
    password: 'sistpostulacion',
    database: 'sistpostulacion'
});

const db = {}
const sequelize = new Sequelize("sistpostulacion", "sisAutomatizacionMGP", "sistpostulacion", { // database, user , password
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.mysqlConnection = mysqlconnection
module.exports = db