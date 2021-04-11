var express = require('express');
var router = express.Router();
var TareaControllers = require('../controllers/tarea.controllers');

/* GET users listing. */
router.get('/getTareasByUser/:id_usuario',TareaControllers.getTareasByUser);
router.post('/crearTarea',TareaControllers.crearTarea);
router.put('/marcarResueltaTarea/:id_tarea',TareaControllers.marcarResueltaTarea);
router.delete('/eliminar/:id_tarea',TareaControllers.eliminar);

module.exports = router;