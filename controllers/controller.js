const bcrypt = require('bcryptjs');
const { agregarUsuario } = require('../models/model');

const registrar = async (req, res) => {
   const { email, password, rol, lenguaje } = req.body;
   try {
      const result = await agregarUsuario({
         email,
         password: bcrypt.hashSync(password, 10),
         rol,
         lenguaje,
      });
      res.json(result);
   } catch (error) {
      if (error.code === '23505') {
         res.status(400).json({ error: 'El usuario ya existe' });
      }
      res.status(500).json(error);
   }
};

module.exports = { registrar };
