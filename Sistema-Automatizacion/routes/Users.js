const express = require("express")
const usuarios = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
usuarios.use(cors())

process.env.SECRET_KEY = 'secret'

//REGISTRAR

usuarios.post('/register',(req,res) =>{
    const userData = {
        correo : req.body.correo,
        password : req.body.password
    }

    User.findOne({
        where:{
        correo : req.body.correo
        }
    })
    .then(usuario =>{
        if(!usuario){
            const hash = bcrypt.hashSync(userData.password,20)
            userData.password = hash
            User.create(userData)
            .then(user =>{
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440

                })
                res.json({token:token})

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
/*
//LOGIN
usuarios.post('/login',(req,res) =>{
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(bcrypt.compareSync(req.body.password, )){
            let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                expiresIn: 1440
            })
            res.send({token:token})
        }else{
            res.send('Usuario no existe')
        }
    })
    .catch(err =>{
        res.send('error' + err)
    })

})*/

module.exports = usuarios
