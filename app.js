var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

const app = express();
app.use(cors({
    origin: '*'
  }));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.json({limit: '100mb', extended: true}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//rutas que no requieren token
app.use('/users', require('./routes/users'));
app.get('/', (req, res) => res.send('API TODO LIST v0.0.0'));

app.use((req, res, next) => {

  var token = req.headers['authorization']
    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        })
        return
    }
    token = token.replace('Bearer ', '')

    
    jwt.verify(token, 'TODOLIST2021', function (err) {
        if (err) {
            res.status(401).send({
                error: 'Token inválido'
            })
        } else {
          next();
        }
    });
});

app.use('/tareas', require('./routes/tarea'));

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app