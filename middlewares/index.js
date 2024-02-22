const jwt = require('jsonwebtoken');

const registrar = (req, res, next) => {
   try {
      const { email, password, rol, lenguage } = req.body;
      if (
         !email ||
         email === '' ||
         !password ||
         password === '' ||
         !rol ||
         rol === '' ||
         !lenguage ||
         lenguage === ''
      ) {
         return res
            .status(400)
            .json({ message: 'Todos los campos son obligatorios' });
      } else {
         next();
      }
   } catch (error) {
      next(error);
   }
};

const validar = (req, res, next) => {
   try {
      const { email, password } = req.body;
      if (email && email !== '' && password && password !== '') {
         next();
      } else {
         return res
            .status(400)
            .json({ message: 'Todos los campos son obligatorios' });
      }
   } catch (error) {
      next(error);
   }
};

const verificarToken = (req, res, next) => {
   try {
      const Authorization = req.header('Authorization');
      const Bearer = Authorization.split(' ');
      const token = Bearer[1];
      const tokenVerificado = jwt.verify(token, process.env.SECRET_KEY);
      req.body = token;
      next();
   } catch (error) {
      next(error);
   }
};

module.exports = { registrar, validar, verificarToken };
