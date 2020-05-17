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

//REGISTRAR
//esto falta de revisar
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
//ELIMINAR USUARIO
router.post('/eliminarusuario',(req,res)=>{
    
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

//get superusuario

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


//insert postulante 
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


//insert asistente 
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
module.exports = router
