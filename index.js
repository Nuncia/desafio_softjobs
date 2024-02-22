const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { router } = require('./routes/index.js');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// Middleware handler
app.use((req, res, next) => {
   const method = req.method;
   const querys = req.query;
   const params = req.params;
   const path = req.originalUrl;
   const currentDate = new Date(Date.now());

   const day = currentDate.getDate();
   const month = currentDate.getMonth() + 1;
   const year = currentDate.getFullYear();
   const formattedDate = `${day}/${month}/${year}`;

   console.log(
      `Fecha ${formattedDate}, \n
       Method: ${method} \n
       Path: ${path} \n`
   );

   if (Object.keys(querys).length) console.table(querys);
   next();
});

app.use('/', router);

app.use((error, req, res, next) => {
   console.log(error);
   res.status(500).send('Error en el servidor');
});

const PORTs = 5003;

app.listen(PORTs, () => {
   console.log(`Servidor escuchando en puerto ${PORTs}`);
});
