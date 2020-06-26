const Sequelize = require('sequelize')
const mysql = require('mysql')
//conexion a la bd 

var mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ag123321',
    database:'sistpostulacion'
});

const db = {}
const sequelize = new Sequelize("sistpostulacion","root","ag123321",{
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

db.mysqlConnection = mysqlconnection
module.exports = db
