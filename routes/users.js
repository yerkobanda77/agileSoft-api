var express = require('express');
var router = express.Router();
var UsersControllers = require('../controllers/users.controllers');

/* GET users listing. */
router.post('/login',UsersControllers.login);
router.post('/inscribir',UsersControllers.inscribir);

module.exports = router;
