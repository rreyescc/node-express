'use strict' //activar modo estricto

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombre: String,
    apellidos: String,
    edad: Number
});

module.exports = mongoose.model('Cliente', ClienteSchema)



