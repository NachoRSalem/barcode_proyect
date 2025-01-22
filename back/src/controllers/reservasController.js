const Reserva = require('../models/Reserva');

exports.getReservasByDisfraz = async (req, res) => {
  try {
    const { disfraz_id } = req.params;
    const reservas = await Reserva.findAll({ where: { disfraz_id } });
    res.json(reservas);
  } catch (error) {
    console.error('Error al buscar reservas:', error); 
    res.status(500).json({ error: 'Error al buscar las reservas', detalle: error.message });
  }
};


exports.createReserva = async (req, res) => {
  try {
    const { disfraz_id, fecha_retiro, fecha_devolucion, cliente } = req.body;
    const nuevaReserva = await Reserva.create({ disfraz_id, fecha_retiro, fecha_devolucion, cliente });
    res.json(nuevaReserva);
  } catch (error) {
    console.error('Error al crear la reserva:', error); 
    res.status(500).json({ error: 'Error al crear la reserva', detalle: error.message });
  }
};
