const Sequelize = require('sequelize');
const db = require('../config/database');
const Usuario = require('./usuario');

const Tarea = db.define('tarea',{
    id_tarea:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    id_usuario:{
        type:Sequelize.INTEGER
    },
    nombre:{
        type:Sequelize.STRING
    },
    estado:{
        type:Sequelize.STRING
    },
    descripcion:{
        type:Sequelize.STRING
    },
    fecha_creacion:{
        type:Sequelize.DATE
    },
    fecha_actualizacion:{
        type:Sequelize.DATE
    }
},
{
    schema: 'main',
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
})

Tarea.belongsTo(Usuario,{foreignKey:'id_usuario'});

module.exports = Tarea;