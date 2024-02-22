const { pool } = require('../database/connection');

const agregarUsuario = async ({ email, password, rol, lenguage }) => {
   try {
      const values = [email, password, rol, lenguage];
      const consulta =
         'INSERT INTO usuarios (id,email, password, rol, lenguage) VALUES (default,$1, $2, $3, $4)';
      const { rowCount } = await pool.query(consulta, values);
      if (rowCount > 0) {
         return rowCount;
      } else {
         return false;
      }
   } catch (error) {
      throw new Error('error al registrar el usuario');
   }
};

const validarUsuario = async ({ email }) => {
   try {
      const consulta = 'SELECT * FROM usuarios WHERE email = $1';
      const { rows, rowCount } = await pool.query(consulta, [email]);
      if (rowCount > 0) {
         return rows;
      } else {
         return false;
      }
   } catch (error) {
      throw new Error('Error al registrar el usuario');
   }
};

module.exports = { agregarUsuario, validarUsuario };
