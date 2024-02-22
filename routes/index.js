const Router = require('express');
const controller = require('../controllers/index');
const { registrar, validar, verificarToken } = require('../middlewares');

const router = Router();

router.post('/usuarios', registrar, controller.registrar);

router.post('/login', validar, controller.validar);

router.get('/usuarios', verificarToken, controller.validarToken);

module.exports = { router };
