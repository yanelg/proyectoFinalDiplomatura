var express = require('express');
const { log } = require('util');
var router = express.Router();
const pool = require('../../models/bd');
var contactosModel = require('../../models/contactosModel');

/*GET home page */
router.get('/', function (req, res, next) {
    var novedades = contactosModel.getContactos();
    res.render('admin/novedades', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedades
    });
});

router.get('/novedades', function (req, res, next) {
    res.render('admin/novedades');
});

router.post('/save', (req, res) => {
    let data = { fecha: req.body.fecha, novedad: req.body.novedad };
    let sql = "INSERT INTO novedades SET ?";
    let query = pool.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(results)
        res.redirect('/admin/novedades/novedades');
    });
})

router.get('/getnovedades', (req, res) => {
    let sql = "SELECT * FROM novedades";
    let query = pool.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)
    });
})

module.exports = router;