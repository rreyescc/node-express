'use strict'

var mongoose = require('mongoose');
var app = require('./app');
const puerto = 3700;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/node_vue')
        .then(() => {
            console.log('Conexion exitosa!!!');
            app.listen(puerto, () => {
                console.log("Servidor iniciado");
            });
        }).catch( error => {
            console.log(error);
        })