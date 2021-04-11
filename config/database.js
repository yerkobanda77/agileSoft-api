const Sequelize = require('sequelize');
var baseDatos = '';
var usuario = '';
var pass = '';
var host = '';


if(process.env.DEV == 'true'){
  baseDatos = 'TODOLIST';
  usuario = 'todolist';
  pass = '123456';
  host = 'localhost';
}else if(process.env.QA == 'true'){
  baseDatos = 'TODOLIST';
  usuario = 'todolist';
  pass = '123456';
  host = 'localhost';
}else if(process.env.PROD == 'true'){
  baseDatos = 'TODOLIST';
  usuario = 'todolist';
  pass = '123456';
  host = 'localhost';
}else{
  baseDatos = 'TODOLIST';
  usuario = 'todolist';
  pass = '123456';
  host = 'localhost';
}

module.exports = new Sequelize(baseDatos, usuario, pass, {
  host: host,
  dialect: 'postgres',
  schema: 'main',
  dialectOptions: { 
    useUTC: true,
  },
  timezone: "America/Santiago",// '-03:10',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});