const express = require('express');
const morgan =  require('morgan');
const engine = require('ejs-mate');
const session = require('express-session');
const mysqlstore =require('express-mysql-session');
const path =  require('path');
const passport = require('passport');
const flash = require('connect-flash');

//inciarlizar///
const app = express();
require('./lib/passport');
const {database} = require('./keys');

//configuracion//
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


//middelware//
app.use(session({
    secret:'JuanDaForero',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
  }));
  
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


//rutas//
app.use('/',require('./routes/'));
app.use(require('./routes/autenticacion'));
app.use('/enlaces',require('./routes/enlaces'));

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.success2 = req.flash('success2');
  app.locals.user = req.user;
  next();
});

//public//
app.use(express.static (path.join(__dirname, 'public'))); 

//Empezar servidor//
app.listen(app.get('port'), ()=>{
    console.log('Corriendo en el puerto: ',app.get('port'));
});
