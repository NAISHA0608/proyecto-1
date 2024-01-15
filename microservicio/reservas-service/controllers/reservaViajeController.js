const axios = require('axios');
const ReservaViaje = require("../models/ReservaViaje");

exports.crearReservaViaje = async (req, res) => {
  try {
    let reservaViaje = new ReservaViaje(req.body);
    await reservaViaje.save();

    // Enviar una solicitud para crear una reserva en el servicio de usuarios
    await axios.post('http://localhost:7001/api/usuarios/crearreserva', {
      reservaViajeId: reservaViaje._id,
      usuarioId: reservaViaje.usuario,
      destino: reservaViaje.destino,
      fechaInicio: reservaViaje.fechaInicio,
      fechaFin: reservaViaje.fechaFin,
      numeroPersonas: reservaViaje.numeroPersonas,
      detalles: reservaViaje.detalles,
    });

    res.json(reservaViaje);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerReservasViaje = async (req, res) => {
  try {
    const reservasViaje = await ReservaViaje.find();
    res.json(reservasViaje);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.actualizarReservaViaje = async (req, res) => {
  try {
    const { usuario, destino, fechaInicio, fechaFin, numeroPersonas, detalles } = req.body;
    let reservaViaje = await ReservaViaje.findById(req.params.id);

    if (!reservaViaje) {
      res.status(404).json({ msg: 'No existe la reserva de viaje' });
    }

    reservaViaje.usuario = usuario;
    reservaViaje.destino = destino;
    reservaViaje.fechaInicio = fechaInicio;
    reservaViaje.fechaFin = fechaFin;
    reservaViaje.numeroPersonas = numeroPersonas;
    reservaViaje.detalles = detalles;

    reservaViaje = await ReservaViaje.findOneAndUpdate({ _id: req.params.id }, reservaViaje, { new: true });
    res.json(reservaViaje);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerReservaViaje = async (req, res) => {
  try {
    let reservaViaje = await ReservaViaje.findById(req.params.id);

    if (!reservaViaje) {
      res.status(404).json({ msg: 'No existe la reserva de viaje' });
    }

    res.json(reservaViaje);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.eliminarReservaViaje = async (req, res) => {
  try {
    let reservaViaje = await ReservaViaje.findById(req.params.id);

    if (!reservaViaje) {
      res.status(404).json({ msg: 'No existe la reserva de viaje' });
    }

    await ReservaViaje.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Reserva de viaje eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
