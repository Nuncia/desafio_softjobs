const Router = require('express');
const controller = require('../controllers/controller');
const { registrar } = require('../middlewares/middleware');

const router = Router();

router.post('/usuarios', registrar, controller.registrar);

module.exports = { router };
