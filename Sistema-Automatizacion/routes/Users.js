const express = require("express")
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')

const User = require("../models/User")
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
router.delete('/eliminarusuario',(req,res)=>{
    const userData = {
        correo : req.body.correo,
        password : req.body.password
    }
    User.findOne({
        where: {
            correo: req.body.correo
        }
    })
        .then(user =>{
            if(user){
                //delete user.dataValues
                res.json({token : token})
            }else{
                res.send('Usuario no existe')
            }

        })
        .catch(err =>{
            res.send('error'+err)
        })
        
})
//perfil
router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    User.findOne({
      where: {
        id: decoded.id
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


module.exports = router
