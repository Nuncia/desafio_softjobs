const jwt = require('jsonwebtoken');

const registrar = (req, res, next) => {
   try {
      console.log(req.body);
      const { email, password, rol, lenguaje } = req.body;
      if (email && password && rol && lenguaje) {
         next();
      } else {
         res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

module.exports = { registrar };
