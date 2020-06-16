const express = require("express")
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
const path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const nodemailer = require('nodemailer'); 

const User = require("../models/User")
const Superuser = require('../models/Superusuario')
const Postulant = require('../models/Postulante')
const Periodo = require('../models/Periodo')
const Asistente = require('../models/Asistente')
const Postulacion = require('../models/Postulacion')
const Atributo = require('../models/Atributo')
router.use(cors())

process.env.SECRET_KEY = 'secret'

const db = require('../database/db')

db.mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connección con exito');
    else
        console.log('Error de coneccion a la base de datos\n Error: ' + JSON.stringify(err, undefined, 2));

})

//CRUD USUARIOS
//REGISTRAR  USUARIOS -> FALTA ENCRIPTAR PASSWORD
router.post('/register', (req, res) => {
    const userData = {
        correo: req.body.correo,
        password: req.body.password
    }
    User.findOne({
            where: {
                correo: req.body.correo
            }
        })
        //bcrypt
        .then(usuario => {
            if (!usuario) {
                //const hash = bcrypt.hashSync(userData.password,30)
                // userData.password = hash
                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'Usuario ya existe' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//ELIMINAR USUARIOS
router.delete('/deleteuser', function(req, res, next) {
    User.destroy({
            where: {
                correo: req.body.correo
            }
        })
        .then(() => {
            res.json({ status: 'Usuario Eliminado' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//ACTUALIZAR USUARIOS
router.put('/updateusuario', function(req, res, next) {
    if (!req.body.correo) {
        res.status(400)
        res.json({
            error: 'Bad data'
        })
    } else {
        User.update({ password: req.body.password }, { where: { correo: req.body.correo } })
            .then(() => {
                res.json({ status: 'Password actualizada' })
            })
            .error(err => handleError(err))
    }
})

//RETORNAR TODOS LOS USUARIOS 
router.get('/getallusers', function(req, res, next) {
    User.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

/////////////////////////////////////////////////////////
//CRUD ASISTENTES

//REGISTRAR ASISTENTES
router.post('/registerasistente', (req, res) => {
    db.mysqlConnection.query('CALL CrearAsistente(?,?,?,?)', [req.body.correo, req.body.password, req.body.nombre, req.body.cedula], (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err)
    })
})

//ELIMINAR ASISTENTES
router.post('/deleteasistant', function(req, res, next) {
    console.log("req.body.correo");
    console.log(req.body.correo);
    db.mysqlConnection.query('CALL EliminarAsistente(?)', [req.body.correo],
        (err, row, fields) => {
            if (!err) {
                res.send(row);
                console.log(row);
            } else
                res.send(err);
        })
})

//ACTUALIZAR ASISTENTES
router.put('/updateasistant', function(req, res, next) {
    db.mysqlConnection.query('CALL EditarAsistente(?,?,?,?)', [req.body.correo, req.body.password, req.body.nombre, req.body.cedula], (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

/////////////////////////////////////////////////////////
//CRUD SUPERUSUARIOS 

//CREATE  SUPERUSUARIO
router.post('/registersuper', (req, res) => {
    const userData = {
        correo: req.body.correo,
        correoEnvio: req.body.correoEnvio
    }
    Superuser.findOne({
            where: {
                correo: req.body.correo,
            }
        })
        .then(asistente => {
            if (!asistente) {
                Superuser.create(userData)
                    .then(asistente => {
                        let token = jwt.sign(asistente.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'Superusuario ya existe' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//GET SUPERUSUARIO 
router.post('/isSuper', (req, res) => {

    Superuser.findOne({
            where: {
                correo: req.body.correo,
            }
        })
        .then(supuser => {
            if (supuser) {

                res.send({ answer: true })
            } else {
                res.send({ answer: false })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
})

//ACTUALIZAR SUPERUSUARIO
router.put('/updatesuper', function(req, res, next) {
    if (!req.body.correo) {
        res.status(400)
        res.json({
            error: 'Correo no existe'
        })
    } else {
        Superuser.update({ correoEnvio: req.body.correoEnvio }, { where: { correo: req.body.correo } })
            .then(() => {
                res.json({ status: 'Correo Superusuario Actualizado' })
            })
            .error(err => handleError(err))
    }
})

/////////////////////////////////////////////////////////
//CRUD PERIODO

//EDITAR PERIODO
router.post('/EditarPeriodo', (req, res) => {
    db.mysqlConnection.query('CALL EditarPeriodo(?,?,?)', [req.body.periodo.periodo, req.body.fechaInicio.slice(0, 10), req.body.fechaCierre.slice(0, 10)], (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})


//ELIMINAR PERIODO
router.post('/EliminarPeriodo', (req, res) => {
    db.mysqlConnection.query('CALL EliminarPeriodo(?)', [req.body.periodo], (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//Ver Periodos
router.get('/VerPeriodos', (req, res) => {
    db.mysqlConnection.query('CALL VerPeriodo()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//Cerrar Periodo Actual
router.post('/CerrarPeriodoActual', (req, res) => {
    db.mysqlConnection.query('CALL CerrarPeriodoActual(?)', [req.body.periodo], (err, row, fields) => {
        if (!err)
            if (row.affectedRows == 1)
                res.send({ response: true });
            else
                res.send({ response: false })
        else
            console.log(err);
    })
})

//get Periodo Actual
router.get('/getPeriodoActual', (req, res) => {
    db.mysqlConnection.query('CALL PeriodoActual()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

/////////////////////////////////////////////////////////
//CRUD POSTULANTES

//REGISTRAR PERIODO
router.post('/registerpostulante', (req, res) => {
    const userData = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        telefono1: req.body.telefono1,
        telefono2: req.body.telefono2,
        correo1: req.body.correo1,
        correo2: req.body.correo2,
        ingles: req.body.ingles,
        gradoAcademico: req.body.gradoAcademico,
        universidad: req.body.universidad,
        afinidad: req.body.afinidad,
        acreditada: req.body.acreditada,
        puestoActual: req.body.puestoActual,
        experienciaProfesion: req.body.experienciaProfesion,
        cursoAfin: req.body.cursoAfin,
        tituloTecnico: req.body.tituloTecnico,
        cursoAprovechamiento: req.body.cursoAprovechamiento,
        tituloDiplomado: req.body.tituloDiplomado,
        promedioGeneral: req.body.promedioGeneral,
    }
    const userDataPost = {
        periodo: req.body.periodo,
        cedula: req.body.cedula,
        enfasis: req.body.enfasis,
        sede: req.body.sede,
        nota: req.body.nota,
        memo: req.body.memo
    }

    Postulant.findOne({
            where: {
                cedula: req.body.cedula
            }
        }).then(postulante => {
            if (!postulante) {
                Postulant.create(userData)
                    .then(postulacion => {
                        Postulacion.findOne({
                                where: {
                                    periodo: req.body.periodo,
                                    cedula: req.body.cedula,
                                }
                            })
                            .then(postulacion => {
                                if (!postulacion) {
                                    console.log(req.body.cedula)
                                    Postulacion.create(userDataPost)
                                        .then(postulacion => {
                                            let token = jwt.sign(postulacion.dataValues, process.env.SECRET_KEY, {
                                                expiresIn: 1440
                                            })
                                            res.json({ token: token })
                                        })
                                        .catch(err => {
                                            res.send('error: ' + err)
                                        })
                                } else {

                                    res.json({ error: 'Postulacion ya existe' })
                                }
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                Postulacion.findOne({
                        where: {
                            periodo: req.body.periodo,
                            cedula: req.body.cedula,
                        }
                    })
                    .then(postulacion => {
                        if (!postulacion) {
                            console.log(req.body.cedula)
                            Postulacion.create(userDataPost)
                                .then(postulacion => {
                                    let token = jwt.sign(postulacion.dataValues, process.env.SECRET_KEY, {
                                        expiresIn: 1440
                                    })
                                    res.json({ token: token })
                                })
                                .catch(err => {
                                    res.send('error: ' + err)
                                })
                        } else {
                            res.json({ error: 'Postulacion ya existe' })
                        }
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//ELIMINAR POSTULANTE 
router.delete('/deletepostulante', function(req, res, next) {
    Postulant.destroy({
            where: {
                cedula: req.body.cedula
            }
        })
        .then(() => {
            res.json({ status: 'Postulante Eliminado' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//UPDATE POSTULANTE 
router.put('/EditPostulante', function(req, res, next) {
    db.mysqlConnection.query('CALL EditarPostulante(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.cedula,req.body.nombre,req.body.telefono1,req.body.telefono2,req.body.correo1,req.body.correo2,
    req.body.ingles,req.body.gradoAcademico,req.body.universidad,req.body.afinidad,req.body.acreditada,req.body.puestoActual,req.body.experienciaProfesion,
    req.body.cursoAfin,req.body.tituloTecnico,req.body.cursoAprovechamiento,req.body.tituloDiplomado,req.body.promedioGeneral,req.body.nota], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
  
})

/////////////////////////////////////////////////////////
//CRUD POSTULACION 
router.post('/registerpostulacion', (req, res) => {
    const userData = {
        periodo: req.body.periodo,
        cedula: req.body.cedula,
        enfasis: req.body.enfasis,
        sede: req.body.sede,
        nota: req.body.nota,
        memo: req.body.memo
    }
    Postulacion.findOne({
            where: {
                periodo: req.body.periodo,
                cedula: req.body.cedula,
            }
        })
        .then(postulante => {
            if (!postulante) {
                Postulacion.create(userData)
                    .then(postulante => {
                        let token = jwt.sign(postulante.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'Postulacion ya existe' })
            }

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//get all postulaciones 
router.get('/getallpostulaciones', function(req, res, next) {
    Postulacion.findAll({
            where: {
                periodo: req.body.periodo
            }
        })
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

/////////////////////////////////////////
//CRUD ATRIBUTOS
//get atributos 
router.get('/getallatributos', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerAtributos()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

///////////////////////////
//CRUD PERIODOS 
router.get('/getallperiodos', function(req, res, next) {
    Periodo.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//edit superusuario
router.put('/editSuper', (req, res) => {
    db.mysqlConnection.query('CALL EditarSuperusuario(?, ?, ?)', [req.body.correo, req.body.password, req.body.correoEnvio],
        (err, row, fields) => {
            if (!err)
                res.send(row);
            else
                console.log(err);
        })
})

//Crear periodo
router.post('/CrearPeriodo', (req, res) => {
    db.mysqlConnection.query('CALL CrearPeriodo(?,?,?)', [req.body.periodo + " " + req.body.fechaInicio.slice(0, 4),
            req.body.fechaInicio.slice(0, 10),
            req.body.fechaCierre.slice(0, 10)
        ],
        (err, row, fields) => {
            if (!err)
                res.send(row);
            else
                console.log(err);
        })
})

//obtener postulantes 
router.post('/obtenerpostulantes', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerPostulaciones(?)', [req.body.periodo], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})

//obtener asistentes 
router.get('/obtenerasistentes', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerAsistentes()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//update periodo
router.put('/updateperiodo', function(req, res, next) {
    if (!req.body.periodo) {
        res.status(400)
        res.json({
            error: 'Bad data'
        })
    } else {
        Periodo.update({ fechaInicio: req.body.fechaInicio, fechaCierre: req.body.fechaCierre }, { where: { periodo: req.body.periodo } })
            .then(() => {
                res.json({ status: 'Periodo Actualizado' })
            })
            .error(err => handleError(err))
    }
})

//LOGIN
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                correo: req.body.correo,
                password: req.body.password
            }
        })
        .then(user => {
            if (user) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 3000
                })
                res.json({ token: token })
            } else {
                res.send('Usuario no existe')
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
})

//perfil
router.get('/perfil', (req, res) => {
    User.findOne({
            where: {
                correo: req.body.correo
            }
        })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//get Periodo Anterior
router.get('/getPeriodoAnterior', (req, res) => {
    db.mysqlConnection.query('CALL PeriodoAnterior()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//get periodos transcurridos
router.get('/getPeriodosTranscurridos', (req, res) => {
    db.mysqlConnection.query('CALL PeriodosTranscurridos()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//obtener postulantes 
router.post('/obtenerAdmitidos', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerAdmitidos(?,?)', [req.body.periodo, req.body.nota], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})

//obtener superusuario 
router.post('/obtenerSuperusuario', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerSuperusuario(?)', [req.body.correo], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})

//obtener asistente 
router.post('/obtenerAsistente', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerAsistente(?)', [req.body.correo], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})

//edit asistente
router.put('/editAsist', (req, res) => {
    db.mysqlConnection.query('CALL EditarAsistente(?, ?, ?, ?)', [req.body.correo, req.body.password, req.body.cedula, req.body.nombre],
        (err, row, fields) => {
            if (!err)
                res.send(row);
            else
                console.log(err);
        })
})

//get atributos 
router.get('/getallatributos', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerAtributos()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//get periodo especifico
router.post('/getPeriodoEspecifico', (req, res) => {
    db.mysqlConnection.query('CALL PeriodoEspecifico(?)', [req.body.periodo],
        (err, row, fields) => {
            if (!err)
                res.send(row);
            else
                console.log(err);
        })
})

//registrar importar archivo
//REGISTRAR POSTULANTE 
router.post('/registerpostulanteA', (req, res) => {
    const userData = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        telefono1: req.body.telefono1,
        telefono2: req.body.telefono2,
        correo1: req.body.correo1,
        correo2: req.body.correo2,
        ingles: req.body.ingles,
        gradoAcademico: req.body.gradoAcademico,
        universidad: req.body.universidad,
        afinidad: req.body.afinidad,
        acreditada: req.body.acreditada,
        puestoActual: req.body.puestoActual,
        experienciaProfesion: req.body.experienciaProfesion,
        cursoAfin: req.body.cursoAfin,
        tituloTecnico: req.body.tituloTecnico,
        cursoAprovechamiento: req.body.cursoAprovechamiento,
        tituloDiplomado: req.body.tituloDiplomado,
        promedioGeneral: req.body.promedioGeneral,
    }
    const userDataPost = {
        periodo: req.body.periodo,
        cedula: req.body.cedula,
        enfasis: req.body.enfasis,
        sede: req.body.sede,
        nota: req.body.nota,
        memo: req.body.memo
    }

    Postulant.findOne({
            where: {
                cedula: req.body.cedula
            }
        }).then(postulante => {
            if (!postulante) {
                Postulant.create(userData)
                    .then(postulacion => {
                        Postulacion.findOne({
                                where: {
                                    periodo: req.body.periodo,
                                    cedula: req.body.cedula,
                                }
                            })
                            .then(postulacion => {
                                if (!postulacion) {
                                    console.log(req.body.cedula)
                                    Postulacion.create(userDataPost)
                                        .then(postulacion => {
                                            let token = jwt.sign(postulacion.dataValues, process.env.SECRET_KEY, {
                                                expiresIn: 1440
                                            })
                                            res.json({ token: token })
                                        })
                                        .catch(err => {
                                            res.send('error: ' + err)
                                        })
                                } else {
                                    res.json({ error: 'Postulacion ya existe' })
                                }
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                Postulant.update(userData, { where: { cedula: req.body.cedula } })
                Postulacion.findOne({
                        where: {
                            periodo: req.body.periodo,
                            cedula: req.body.cedula,
                        }
                    })
                    .then(postulacion => {
                        if (!postulacion) {
                            console.log(req.body.cedula)
                            Postulacion.create(userDataPost)
                                .then(postulacion => {
                                    let token = jwt.sign(postulacion.dataValues, process.env.SECRET_KEY, {
                                        expiresIn: 1440
                                    })
                                    res.json({ token: token })
                                })
                                .catch(err => {
                                    res.send('error: ' + err)
                                })
                        } else {
                            res.json({ error: 'Postulacion ya existe' })
                        }
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//Obtener 
//obtener postulantes 
router.get('/obtenerallpostulantes', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerPostulantes()', (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})


//obtener postulante 
router.post('/obtenerpostulate', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerPostulante(?)',[req.body.cedula], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})

//Editar formula
router.post('/editarFormula', (req, res) => {
    db.mysqlConnection.query('CALL EditarFormula(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.bachillerato,req.body.licenciatura,req.body.maestria,req.body.doctorado,req.body.promedio,req.body.de3a6,req.body.de6a10,
        req.body.masDe10,req.body.profSinP,req.body.profMiembro,req.body.jefatura,req.body.gerencia,req.body.trabIndependiente,req.body.alta,req.body.media,
        req.body.baja,req.body.acreditada,req.body.noAcreditada,req.body.cAprovechamiento,req.body.tTecnico,req.body.cMaestria,req.body.tDiplomado ], (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//Editar postulacion
router.post('/editarPostulacion', (req, res) => {
    db.mysqlConnection.query('CALL EditarPostulacion(?,?,?,?,?)',[req.body.periodo, req.body.cedula,req.body.enfasis,req.body.sede,req.body.nota,req.body.memo], (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})
//Editar postulacion
router.post('/Repostulacion', (req, res) => {
    db.mysqlConnection.query('CALL CrearPostulacion(?,?,?,?,?,?)', [req.body.periodo, req.body.cedula, req.body.enfasis, req.body.sede, req.body.nota, req.body.memo], (err, row, fields) => {
        if (!err){
            res.json({error:false })
        }
        else {
            res.json({error:true })
        }
    })
})
//ObtenerMemo
router.post('/ObtenerMemo', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerMemo(?,?)',[req.body.periodo, req.body.sede], (err, row, fields) => {
        if (!err)
            res.send(row[0]);
        else
            console.log(err);
    })
})

//ObtenerSedes
router.post('/ObtenerSedes', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerSedes(?)',[req.body.periodo], (err, row, fields) => {
        if (!err)
            res.send(row[0]);
        else
            console.log(err);
    })
})

//Enviar Correo
router.put('/EnviarCorreo', (req, res) => {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
        user: 'maesito4@gmail.com',
        pass: 'eraolivenox1'
        }
    });

    var mailOptions = {
        from: 'maesito4@gmail.com',
        to: req.body.para,
        subject: req.body.asunto,
        text: req.body.texto
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
        res.send({response:200})
    }); 
})

//UPDATE NOTA 
router.put('/EditNota', function(req, res, next) {
    db.mysqlConnection.query('CALL EditarNota(?,?,?)',
    [req.body.cedula,req.body.periodo,req.body.nota], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
  
})

router.post('/UltimaPostulacion', (req, res) => {
    db.mysqlConnection.query('CALL UltimaPostulacion(?)', req.body.cedula, (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

router.post('/ObtenerCorreoEnvio', (req, res) => {
    db.mysqlConnection.query('CALL ObtenerCorreoEnvio(?)', req.body.correo, (err, row, fields) => {
        if (!err)
            res.send(row[0][0]);
        else
            console.log(err);
    })
})

router.post('/UpdatePassword', (req, res) => {
    var generatePassword = require('password-generator'); 
    let password = generatePassword();
    db.mysqlConnection.query('CALL UpdatePassword(?, ?)', [req.body.correo, password], (err, row, fields) => {
        if (!err)
            res.json({password: password});
        else
            console.log(err);
    })
})

module.exports = router