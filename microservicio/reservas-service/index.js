const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/reservaviajes', require('./routes/reservaViaje'));

const port = process.env.PORT || 7002;

app.listen(port, () => {
  console.log(`Servidor Reservas Service está corriendo en el puerto ${port}`);
});
