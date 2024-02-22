const { Pool } = require('pg');
require('dotenv').config();

// cambia los datos de acuerdo a tu configuracion de postgres
const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
   allowExitOnIdle: true,
});

// Función para conectar a la base de datos
const connectToDatabase = async () => {
   try {
      const client = await pool.connect();
      const { rows } = await pool.query('SELECT NOW()');
      console.log('Database connected', rows);
      client.release(); // Liberar el cliente después de usarlo
   } catch (error) {
      console.error('Error connecting to the database:', error);
   }
};

// Llamar a la función para conectarse a la base de datos
connectToDatabase();

module.exports = { pool, connectToDatabase };
