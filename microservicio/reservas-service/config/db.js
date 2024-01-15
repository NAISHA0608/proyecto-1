const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB exitosa (Reservas Service)');
  } catch (error) {
    console.error('Error al conectar a MongoDB (Reservas Service):', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
