const Sequelize = require('sequelize');
const db = require('../config/database');

const Usuario = db.define('usuario',{
    id_usuario:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    nombre:{
        type:Sequelize.STRING
    }
},
{
    schema: 'main',
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
})

module.exports = Usuario;