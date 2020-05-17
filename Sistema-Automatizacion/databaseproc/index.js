const mysql = require("mysql");
const config = require("../database");
const usuarios = require('./usuarios');


console.log(config);
const connection = mysql.createConnection(config.default.mysql);
module.exports.connection = connection

connection.connect(function(err){
    (err) ? console.log(err) : console.log(connection);
});

module.exports.default = {
    usuarios,
    
}  