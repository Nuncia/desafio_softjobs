const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { router } = require('./routes/route.js');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use('/', router);

const PORTs = 5000;

app.listen(PORTs, () => {
   console.log(`Servidor escuchando en puerto ${PORTs}`);
});
