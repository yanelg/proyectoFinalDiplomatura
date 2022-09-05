var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
flash = require('express-flash')

//Declaramos la dependencia a utilizar
require('dotenv').config();


//Declaramos la dependencia a utilizar
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Creamos los controladores
var loginRouter = require('./routes/admin/login'); //login.js
var adminRouter = require('./routes/admin/novedades'); //novedades.js
const pool = require('./models/bd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//palabra secreta
app.use(session({
  secret: 'PW2021awqyeudj',
  cookie: { maxAge: null },
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {

  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    } // cierro catch error
  } catch {
    res.redirect('/admin/login');
  } // cierro secured
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Declaramos el modo de uso
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', adminRouter);


app.use('/users', usersRouter);
app.use('/', indexRouter);

// declaramos el modo de uso de los controladores
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);

pool.query('select * from usuarios').then(function (resultados) {
  console.log(resultados)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
