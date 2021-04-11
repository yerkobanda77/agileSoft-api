var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
Usuario = new Usuario();
const usuarios = [
    {
        id_usuario: 1,
        username: 'yerkobanda',
        password: '123456',
        nombre: 'Yerko Banda'
    },
    {
        id_usuario: 2,
        username: 'agilesoft',
        password: 'agile1234',
        nombre: 'Agile Soft'
    }
];

function login(req, res){
    let respuesta = {
        ok: false,
        error: "",
        respuesta: null
    };
    try{
        var data = req.body;

        if(data != null && data.username != null && data.password != null){
            //Usuario = new Usuario();
            usuarios.find(function(value, index) {
                if(value.username === data.username && value.password === data.password){
                    Usuario = value;
                }                
            });
            if(Usuario.id_usuario != null){
                var  tokenData = {
                    username: req.body.username
                }
            
                var token = jwt.sign(tokenData, 'TODOLIST2021', {
                    expiresIn: 60 * 30 // expira en 30 minutos
                });
            
                var resp = {
                    token: token,
                    username: Usuario.username,
                    nombre: Usuario.nombre
                }
            
                respuesta.ok = true;
                respuesta.respuesta = resp;
            }
            else{
                respuesta.error = "NO EXISTE USUARIO"
            }            
        
            res.status(200).send(respuesta);
        }
        else{
            respuesta.error = "SIN DATOS PARA VALIDAR USUARIO";    
            res.status(200).send(respuesta);
        }   
    }
    catch (error) {
        console.log(error);
        respuesta.error = error;    
        res.status(500).send(respuesta);
    };

}

function inscribir(req, res){
    let respuesta = {
        ok: false,
        error: "",
        respuesta: null
    };    
    try{
        var data = req.body;

        if(data != null && data.username != null && data.password != null && data.nombre != null){
            //Usuario = new Usuario();
            Usuario.id_usuario = 3;
            Usuario.username = data.username;
            Usuario.password = data.password;
            Usuario.nombre = data.nombre;
            respuesta.respuesta = Usuario;
            respuesta.ok = true;
            res.status(200).send(respuesta);
        }
        else{
            respuesta.error = "SIN DATOS PARA INGRESAR USUARIO";    
            res.status(200).send(respuesta);
        }  

    }
    catch (error) {
        console.log(error);
        respuesta.error = error;    
        res.status(500).send(respuesta);
    };
}

module.exports = {
    login,
    inscribir
}