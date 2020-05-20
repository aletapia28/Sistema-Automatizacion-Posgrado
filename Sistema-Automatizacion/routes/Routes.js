const express = require("express")
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
const path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


const User = require("../models/User")
const Superuser = require('../models/Superusuario')
const Postulant = require('../models/Postulante')
const Periodo = require('../models/Periodo')
const Asistente = require('../models/Asistente')
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
router.post('/register',(req,res) =>{
    const userData = {
        correo : req.body.correo,
        password : req.body.password
    }
    User.findOne({
        where: {
            correo : req.body.correo
        }
    })
        //bcrypt
        .then(usuario =>{
            if(!usuario){
                //const hash = bcrypt.hashSync(userData.password,30)
               // userData.password = hash
                User.create(userData)
                    .then(user =>{
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                            expiresIn: 1440

                        })
                        res.json({token: token})

                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
                
            }else{
                res.json({error: 'Usuario ya existe'})
            }

        })
        .catch(err =>{
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
        User.update(
        { password: req.body.password },
        { where: { correo: req.body.correo} }
        )
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
router.post('/registerasistente',(req,res) =>{
    const userData = {
        correo: req.body.correo,
        nombre : req.body.nombre,
        cedula: req.body.cedula
    }
    Asistente.findOne({
        where: {
            correo : req.body.correo,
        }
    })
        .then(asistente =>{
            if(!asistente){
                Asistente.create(userData)
                    .then(asistente =>{
                        let token = jwt.sign(asistente.dataValues, process.env.SECRET_KEY,{
                            expiresIn: 1440

                        })
                        res.json({token: token})

                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
                
            }else{
                res.json({error: 'Asistente ya existe'})
            }

        })
        .catch(err =>{
            res.send('error: ' + err)
        })
})

//ELIMINAR ASISTENTES
router.delete('/deleteasistant', function(req, res, next) {
    Asistente.destroy({
        where: {
        correo: req.body.correo
        }
    })
        .then(() => {
        res.json({ status: 'Asistente Eliminado' })
        })
        .catch(err => {
        res.send('error: ' + err)
        })
})

//ACTUALIZAR ASISTENTES
router.put('/updateasistant', function(req, res, next) {
    if (!req.body.correo) {
      res.status(400)
      res.json({
        error: 'Bad data'
      })
    } else {
      Asistente.update(
        { nombre: req.body.nombre, cedula: req.body.cedula},
        { where: {correo: req.body.correo} }
        
      )
        .then(() => {
          res.json({ status: 'Asistente Actualizado' })
        })
        .error(err => handleError(err))
    }
})

//RETORNAR ASISTENTES
//falta probar
router.get('/getallasist', function(req, res, next) {
    Asistente.findAll()
      .then(tasks => {
        res.json(tasks)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

//RETORNAR ASISTENTE BY CORREO
router.get('/getasist', (req, res) => {
    Asistente.findOne({
      where: {
        correo: req.body.correo
      }
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send(user)
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})

/////////////////////////////////////////////////////////
//CRUD SUPERUSUARIOS 

//CREATE  SUPERUSUARIO
router.post('/registersuper',(req,res) =>{
    const userData = {
        correo: req.body.correo,
        correoEnvio: req.body.correoEnvio
    }
    Superuser.findOne({
        where: {
            correo : req.body.correo,
        }
    })
        .then(asistente =>{
            if(!asistente){
                Superuser.create(userData)
                    .then(asistente =>{
                        let token = jwt.sign(asistente.dataValues, process.env.SECRET_KEY,{
                            expiresIn: 1440

                        })
                        res.json({token: token})

                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
                
            }else{
                res.json({error: 'Superusuario ya existe'})
            }

        })
        .catch(err =>{
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
            if(supuser){
                
                res.send({answer:true})
            }else{
                res.send({answer:false})
            }
        })
        .catch(err =>{
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
        Superuser.update(
            { correoEnvio: req.body.correoEnvio },
            { where: { correo: req.body.correo} }
        )
        .then(() => {
            res.json({ status: 'Correo Superusuario Actualizado' })
        })
        .error(err => handleError(err))
    }
})
/////////////////////////////////////////////////////////
//CRUD PERIODO

//REGISTRAR PERIODO

//EDITAR PERIODO

//ELIMINAR PERIODO
//falta probar 
router.delete('/deleteperiodo', function(req, res, next) {
    Periodo.destroy({
        where: {
        periodo: req.body.periodo
        }
    })
        .then(() => {
        res.json({ status: 'Periodo Eliminado' })
        })
        .catch(err => {
        res.send('error: ' + err)
        })
})

//GET ALL PERIODOS 
//falta probar
router.get('/getallperiodos', function(req, res, next) {
    Periodo.findAll()
      .then(tasks => {
        res.json(tasks)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

/////////////////////////////////////////////////////////
//CRUD POSTULANTES

//REGISTRAR POSTULANTE 
router.post('/registerpostulante',(req,res) =>{
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
    Postulant.findOne({
        where: {
            cedula : req.body.cedula
        }
    })
        .then(postulante =>{
            if(!postulante){
                Postulant.create(userData)
                    .then(postulante =>{
                        let token = jwt.sign(postulante.dataValues, process.env.SECRET_KEY,{
                            expiresIn: 1440

                        })
                        res.json({token: token})

                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
                
            }else{
                res.json({error: 'Postulante ya existe'})
            }

        })
        .catch(err =>{
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

/////////////////////////////////////////////////////////





//edit superusuario
router.put('/editSuper', (req, res) => {
    db.mysqlConnection.query('CALL EditarSuperusuario(?, ?, ?)',(err,row,fields)=>{
        if(!err)
        res.send(row);
        else
        console.log(err);
    })
    
})
//definido no implementado
router.put('/editAsist', (req, res) => {
    db.mysqlConnection.query('CALL EditarAsistente(?, ?, ?)',(err,row,fields)=>{
        if(!err)
        res.send(row);
        else
        console.log(err);
    })
    
})
//definido no esta implementado
router.get('/allpostulantes', (req,res) =>{
    db.mysqlConnection.query('CALL SelectPostulantes', (err,row,fields)=>{
        if(!err)
        res.send(row);
        else
        console.log(err);

    })
})
//definido no esta implementado
router.post('/createSuper', (req, res) => {
    db.mysqlConnection.query('CALL CrearSuperusuario(?, ?)',(err,row,fields)=>{
        if(!err)
        res.send(row);
        else
        console.log(err);
    })
    
})
//definido no esta implementado 
router.post('/createpostulacion', (req, res) => {
    db.mysqlConnection.query('CALL CrearPostulacion(?,?,?,?,?, ?)',(err,row,fields)=>{
        if(!err)
        res.send(row);
        else
        console.log(err);
    })
    
})


//LOGIN
router.post('/login',(req,res) =>{
    User.findOne({
        where: {
            correo: req.body.correo,
            password: req.body.password
        }
    })
        .then(user => {
            if(user){
                let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn: 3000
                })
                res.json({token: token})
            }else{
                res.send('Usuario no existe')
            }
        })
        .catch(err =>{
            res.send('error' + err)
        })

})

//perfil
router.get('/perfil', (req, res) => {
    //set from client side, convierte el token al objecto
   // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
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

//insert periodo
router.post('/registerperiodo',(req,res) =>{
    const userData = {
        periodo: req.body.periodo,
        fechaInicio : req.body.fechaInicio,
        fechaCierre: req.body.fechaCierre
    }
    Periodo.findOne({
        where: {
            periodo : req.body.periodo,
        }
    })
        //bcrypt
        .then(periodo =>{
            if(!periodo){
                //const hash = bcrypt.hashSync(userData.password,30)
               // userData.password = hash
                Periodo.create(userData)
                    .then(periodo =>{
                        let token = jwt.sign(periodo.dataValues, process.env.SECRET_KEY,{
                            expiresIn: 1440

                        })
                        res.json({token: token})

                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
                
            }else{
                res.json({error: 'Periodo ya existe'})
            }

        })
        .catch(err =>{
            res.send('error: ' + err)
        })
})



module.exports = router

