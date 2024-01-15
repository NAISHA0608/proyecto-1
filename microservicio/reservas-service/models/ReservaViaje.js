const mongoose = require('mongoose');

const ReservaViajeSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    numeroPersonas: {
        type: Number,
        required: true
    },
    detalles: {
        type: String
    }
});

module.exports = mongoose.model('ReservaViaje', ReservaViajeSchema);
