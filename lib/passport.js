const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'Usuario',
    passwordField: 'Contrasena',
    passReqToCallback: true
},async (req, Usuario, Contrasena,done)=>{
   const feed = await db.query('SELECT *FROM usuarios WHERE usuario = ?', [Usuario]); 
   if(feed.length > 0){
        const user = feed[0];
        
        const validar = await helpers.matchPassword(Contrasena, user.Contrasena);
        if(validar){
            done(null,user);
            console.log('Hay usuario');
        }else{
            done(null,false,req.flash('message', 'Contraseña incorrecta'));
            console.log('Contraseña mal');
        }
   }else{
       return done(null,false,req.flash('message', 'Usuario no encontrado'));
   }    
}));

passport.serializeUser((user, done)=>{
    done(null, user.Id);

});

passport.deserializeUser(async (Id,done)=>{
    const rows = await db.query('SELECT *FROM usuarios WHERE Id =?',[Id]);
    done(null,rows[0]);
 });
 