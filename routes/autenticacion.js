const { decodeBase64 } = require('bcryptjs');
const express =  require('express');
const { serializeUser } = require('passport');
const router =  express.Router();
const passport = require('passport');


const {isLoggedIn, IsNotLoggedin} =require('../lib/auth');

const db = require('../db');
const helpers = require('../lib/helpers');

router.get('/login', IsNotLoggedin,(req,res)=>{
    res.render('auth/login', {message: req.flash('message')});
});

router.post('/login', IsNotLoggedin, (req,res,next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/inicio',
        failureRedirect: '/login',
        failureFlash: true
    }) (req,res,next);
});

router.get('/inicio', isLoggedIn , (req,res)=>{
    res.render('inicio',{success: req.user.Nombre});
});

router.get('/registro', (req,res)=>{
    res.render('auth/registro');
});

router.post('/registro', async (req,res)=>{
    const {Id, Nombre, Apellido, Telefono, Direccion, Usuario, Contrasena, Contrasena2, Email} = req.body;
    if(Id== "" || Nombre == "" || Apellido== "" || Telefono == "" || Direccion == ""  || Usuario==""  ||  Contrasena == ""  || Contrasena2 == "" || Email== "" ){
        req.flash('success','Contraseñas no coincide');
        res.render('auth//login' ,{message: 'Debes llenar todos los campos'});
    }else{
        if(Contrasena === Contrasena2){
            const pass = await helpers.encryptPassword(Contrasena); 
            const nusuario = {
                Id,
                Nombre,
                Apellido,
                Telefono,
                Direccion,
                Usuario,
                Contrasena,
                Email
            };
            //console.log(nusuario);
            nusuario.Contrasena = pass;
            const accion =  await db.query('INSERT INTO usuarios set ?',[nusuario]); 
            console.log(accion);
              
               res.render('auth//login' ,{message: 'Usted ha sido registrado'});
            }else{
             
                res.render('auth//login' ,{message: 'Contraseñas no coincide'});
            }
    } 
});

router.get('/salir',  (req,res)=>{
    req.logOut();
    res.redirect('/login');
});
module.exports = router;