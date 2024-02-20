const { pool } = require('../database/connection');

const agregarUsuario = async ({ email, password, rol, lenguaje }) => {
   try {
      const values = [email, password, rol, lenguaje];
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

const validarUsuario = async ({ email, password }) => {
   try {
      const values = [email, password];
      const consulta =
         'SELECT * FROM usuarios WHERE email = $1 AND password = $2';
      const { rows } = await pool.query(consulta, values);
      if (rows.length > 0) {
         console.log(rows);
         return rows;
      } else {
         return false;
      }
   } catch (error) {
      throw new Error('error al registrar el usuario');
   }
};

module.exports = { agregarUsuario, validarUsuario };
