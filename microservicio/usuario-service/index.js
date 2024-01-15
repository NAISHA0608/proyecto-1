const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuario'));

const port = process.env.PORT || 7001;

app.listen(port, () => {
  console.log(`Servidor Usuarios Service está corriendo en el puerto ${port}`);
});
