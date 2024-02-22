require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { agregarUsuario, validarUsuario } = require('../models/model');

const registrar = async (req, res) => {
   const { email, password, rol, lenguage } = req.body;
   try {
      const result = await agregarUsuario({
         email,
         password: bcrypt.hashSync(password, 10),
         rol,
         lenguage,
      });
      res.status(200).json(result);
   } catch (error) {
      if (error.code === '23505') {
         res.status(400).json({ message: 'El usuario ya existe' });
      }
      res.status(500).json(error);
   }
};

const validar = async (req, res) => {
   const { email, password } = req.body;
   try {
      const usuario = await validarUsuario({ email });
      if (!usuario) {
         return res
            .status(404)
            .json({ message: 'No se encontro usuario con estas credenciales' });
      }
      // Validar la contraseña
      const isMatch = bcrypt.compareSync(password, usuario[0].password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Contraseña incorrecta' });
      } else {
         const payload = {
            usuarioId: usuario[0].id,
            email,
         };

         const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h',
         });
         res.status(200).json({ message: 'Usuario autenticado', token });
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

const validarToken = async (req, res) => {
   try {
      const token = req.body;
      const { usuarioId, email } = jwt.decode(token);
      const usuario = await validarUsuario({ email });
      if (!usuario) {
         return res
            .status(404)
            .json({ message: 'No se encontro usuario con estas credenciales' });
      }
      res.status(200).json(usuario);
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = { registrar, validar, validarToken };
