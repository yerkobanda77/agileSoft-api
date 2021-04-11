var Tarea = require("../models/tarea");

const tareas = [
    {
        id_tarea: 1,
        id_usuario: 1,
        nombre: 'Trabajar',
        estado: 'No Resuelto',
        descripcion: "Trabajar en Desarrollo de Aplicaciones",
        fecha_creacion: "11/04/2021",
        fecha_actualizacion: "11/04/2021"
    },
    {
        id_tarea: 1,
        id_usuario: 2,
        nombre: 'Trabajar',
        estado: 'No Resuelto',
        descripcion: "Trabajar en Desarrollo de Aplicaciones",
        fecha_creacion: "11/04/2021",
        fecha_actualizacion: "11/04/2021"
    },
    {
        id_tarea: 3,
        id_usuario: 1,
        nombre: 'Dormir',
        estado: 'No Resuelto',
        descripcion: "Dormir despues de una larga Prueba",
        fecha_creacion: "11/04/2021",
        fecha_actualizacion: "11/04/2021"
    }
];

function getTareasByUser(req, res){
    let respuesta = {
        ok: false,
        error: "",
        respuesta: null
    };    
    try{
        var data = req.params;

        if(data != null && data.id_usuario != null){
            var respTareas = [];
            tareas.find(function(value, index) {
                if(value.id_usuario === parseInt(data.id_usuario)){
                    respTareas.push(value);
                }                
            });
            respuesta.ok = true;
            respuesta.respuesta = respTareas;
            res.status(200).send(respuesta);
        }
        else{
            respuesta.error = "SIN DATOS PARA BUSCAR TAREAS";    
            res.status(200).send(respuesta);
        }  

    }
    catch (error) {
        console.log(error);
        respuesta.error = error;    
        res.status(500).send(respuesta);
    };
}

function crearTarea(req, res){
    let respuesta = {
        ok: false,
        error: "",
        respuesta: null
    };    
    try{
        var data = req.body;

        if(data != null && 
            data.id_usuario != null && 
            data.nombre != null && 
            data.estado != null && 
            data.descripcion != null){
            Tarea = new Tarea();
            Tarea.id_tarea = 4;
            Tarea.id_usuario = data.id_usuario;
            Tarea.nombre = data.nombre;
            Tarea.estado = data.estado;
            Tarea.descripcion = data.descripcion;            
            Tarea.fecha_creacion = new Date();
            Tarea.fecha_actualizacion = new Date();
            respuesta.respuesta = Tarea;
            res.status(200).send(respuesta);
        }
        else{
            respuesta.error = "SIN DATOS PARA CREAR TAREAS";    
            res.status(200).send(respuesta);
        }  

    }
    catch (error) {
        console.log(error);
        respuesta.error = error;    
        res.status(500).send(respuesta);
    };
}

function marcarResueltaTarea(req, res){
    let respuesta = {
        ok: false,
        error: "",
        respuesta: null
    };    
    try{
        var data = req.params;

        if(data != null && 
            data.id_tarea != null){
            Tarea = tareas.find(Tarea => Tarea.id_usuario === parseInt(data.id_tarea));
            if(Tarea != null){
                Tarea.estado = "Resuelto";
                respuesta.ok = true;
                respuesta.respuesta = Tarea;
            }
            else{
                respuesta.error = "NO SE ENCONTRARON REGISTROS QUE ELIMINAR"
            }
            res.status(200).send(respuesta);
            
        }
        else{
            respuesta.error = "SIN DATOS PARA MODIFICAR TAREAS";    
            res.status(200).send(respuesta);
        }  

    }
    catch (error) {
        console.log(error);
        respuesta.error = error;    
        res.status(500).send(respuesta);
    };
}

function eliminar(req, res){
    let respuesta = {
        ok: false,
        error: "",
        respuesta: null
    };    
    try{
        var data = req.params;

        if(data != null && 
            data.id_tarea != null){
            
            Tarea = tareas.find(Tarea => Tarea.id_usuario === parseInt(data.id_tarea));
            if(Tarea != null){
                respuesta.ok = true;
                respuesta.respuesta = "SE ELIMINO TAREA";
            }
            else{
                respuesta.error = "NO SE ENCONTRARON REGISTROS QUE ELIMINAR"
            }
            res.status(200).send(respuesta);
            
        }
        else{
            respuesta.error = "SIN DATOS PARA ELIMINAR TAREAS";    
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
    getTareasByUser,
    crearTarea,
    marcarResueltaTarea,
    eliminar
}