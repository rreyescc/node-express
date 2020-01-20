'use strict'

//crear un servidor con express

require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivo de rutas
var cliente_routes = require('./routes/cliente');

//app.use -> crea el middlewares
// middlewares: Una capa que se ejecuta antes de ejecutar la accion de un controlador
app.use(bodyParser.urlencoded({extended:false})); //middleware sin ninguna via de acceso de montaje.



//middleware de terceros
app.use(bodyParser.json()); // cualquier tipo de peticion que llegue por el body lo va convertir a json


// CORS


//rutas

app.use('/api', cliente_routes); //middleware montada en la via de acceso /api, la funcion se ejecutara para cualquier tipo de solicitud HTTP

// app.get('/cliente/:id', (request, response) => {

//     console.log(request.query.anio);
//     console.log(request.params.id);

//     console.log(request.headers.token);

//     response.status(200).send(
//         '<h1>API REST</h1>'
//     )
// })

// app.post('/test', (request, response) => {

//     console.log(request.body.nombre + ' ' +request.body.apellidos);

//     response.status(200).send({
//         error: 0,
//         mensaje: 'Se ejecuto con exito'
//     })
// })

// exportar

module.exports = app;






