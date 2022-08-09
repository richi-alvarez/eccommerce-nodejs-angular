'use strict'
var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt')

const registro_cliente = async function(req, res){
    var data = req.body;
    var cliente_arr = [];
    cliente_arr = await Cliente.find({email:data.email});
    if(cliente_arr.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if(hash){
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer', data:undefined});
                }
            })
        }else{
        res.status(200).send({message:'no hay contraseña', data:undefined});
        }
    }else{
        res.status(200).send({message:'El correo ya existe', data:undefined});
    }
}

const login_cliente = async function(req, res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'no se encontro el correo', data:undefined})
    }else{
        let user = cliente_arr[0];
        bcrypt.compare(data.password, user.password, async function(error, check){
            if(check){
                res.status(200).send({
                    data:user,
                    token:jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'la contraseña no coincide', data:undefined})
            }
        });
    } 
}

const listar_clientes_filtro_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'ADMIN'){
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];
        
            if(tipo == null || tipo == 'null'){
                let reg = await Cliente.find();
                res.status(200).send({data:reg});
            }else{
                if(tipo == 'apellidos'){
                    let reg = await Cliente.find({apellidos: new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }else if (tipo == 'email'){
                    let reg = await Cliente.find({email: new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }    
}

module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin
}