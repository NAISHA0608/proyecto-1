const axios = require('axios');
const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, res) => {
  try {
    let usuario = new Usuario(req.body);
    await usuario.save();

    // Enviar una solicitud para crear un usuario en el servicio de reservas
    await axios.post('http://localhost:7002/api/reservaviajes/crearusuario', {
      usuarioId: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      email: usuario.email,
      pais: usuario.pais,
    });

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, direccion, telefono, email, pais } = req.body;
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: 'No existe el usuario' });
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.direccion = direccion;
    usuario.telefono = telefono;
    usuario.email = email;
    usuario.pais = pais;

    usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerUsuario = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: 'No existe el usuario' });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.eliminarUsuario = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: 'No existe el usuario' });
    }

    await Usuario.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
