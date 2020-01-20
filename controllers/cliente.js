'use strict'

var cliente = require('../models/cliente')
var jwt = require('jsonwebtoken');


const usuario = [
    {
        usuario: 'rafael',
        titulo: 'Login 1'
    },
    {
        usuario: 'luana',
        titulo: 'Login 2'
    }
];

var controller = {
    login: function(req, res, next){

        var username = req.body.username;
        var user = { name: username };

        var accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.json({accessToken: accessToken})

    },
    validarToken: function(req, res, next){
        let token = req.headers['authorization'];
        //let token = authHeader && authHeader.split(' ')[1];

        //console.log(token)

        if( token == null) return res.sendStatus(401)
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).send({
                mensaje: 'Token invalido'
            });
            next()
        });
    },
    cliente: function(request, response){
        return response.status(200).send({
            mensaje: 'cliente'
        });
    },
    home: function(request, response){
        return response.status(200).send({
            mensaje: 'home',
            nombre: request.params.animal
        });
    },
    save: function(request, response){

        var modelCliente = new cliente();
        var body = request.body;
        modelCliente.nombre = body.nombre;
        modelCliente.apellidos = body.apellidos;
        modelCliente.edad = body.edad;

        modelCliente.save((err, projectStored) => {
            if(err) return response.status(500).send({
                mensaje: 'Error Interno'
            });

            if(!projectStored) return response.status(404).send({
                mensaje: 'No Encontrado'
            });

            return response.status(200).send({
                cliente: projectStored
            })

        });
        
    },
    find: function(request, response){

        var idCliente = request.params.id;

        if(idCliente == null) return response.status(404).send({
            mensaje: 'No Encontrado'
        });

        cliente.findById(idCliente, (err, document) => {

            if(err) return response.status(500).send({
                mensaje: 'Error Interno'
            });

            if(!document) return response.status(404).send({
                mensaje: 'No Encontrado'
            });

            return response.status(200).send({
                cliente: document
            })
        })

    },
    consultarListaNegra: function(request, response, next){
        if((Math.random() * 10) > 6 ) {
            console.log('Usuario Valido');
            request.params.animal = request.params.animal.toUpperCase();
            next();
        }else{
            console.log('Usuario invalido');
            response.status(404).send({
                mensaje: 'No se encontro el cliente'
            })
        }
        
    }
}

module.exports = controller; //para que se pueda exportar en otro archivo
