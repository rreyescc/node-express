'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var router = express.Router(); //

//middleware de nivel de direccionador x que esta enlazada a una instancia de express.Router()
router.use(function (request, response, next){
    console.log('execute middleware 1');
    next('route');
}, function(request, response, next){
    console.log('execute middleware 2');
    next();
});

router.post('/login', ClienteController.login);

router.get('/home/:animal', [ClienteController.consultarListaNegra,ClienteController.home]);
router.post('/cliente', ClienteController.cliente);
router.post('/save/cliente', ClienteController.save);
router.get('/find/cliente/:id?', ClienteController.validarToken, ClienteController.find); //:id? parametro opcional
module.exports = router;