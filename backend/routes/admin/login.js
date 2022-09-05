var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');
const pool = require('../../models/bd');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/auth', function (request, response) {
  var username = request.body.usuario;
  var password = request.body.password;
  console.log(username + " - " + password);
  if (username && password) {
      pool.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [username, password], function (error, results, fields) {
        console.log(results);  
        if (results.length > 0) {
              request.session.loggedin = true;
              request.session.username = username;
              response.cookie("idUsuario", results[0].idUsuario);
              response.redirect('/admin/novedades/novedades');
          } else {
              request.session.loggedin = false;
              response.redirect('/');
          }
          response.end();
      });
  } else {
      response.send('Please enter Username and Password!');
      response.end();
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

module.exports = router;