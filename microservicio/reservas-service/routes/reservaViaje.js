const express = require('express');
const router = express.Router();
const reservaViajeController = require('../controllers/reservaViajeController');

router.post('/', reservaViajeController.crearReservaViaje);
router.get('/', reservaViajeController.obtenerReservasViaje);
router.put('/:id', reservaViajeController.actualizarReservaViaje);
router.get('/:id', reservaViajeController.obtenerReservaViaje);
router.delete('/:id', reservaViajeController.eliminarReservaViaje);

module.exports = router;
