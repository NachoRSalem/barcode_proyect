const Disfraz = require('../models/Disfraz');

exports.getDisfrazByCodigo = async (req, res) => {
  try {
    const { codigo_barra } = req.params;

    
    const disfraz = await Disfraz.findOne({
      where: { codigo_barra: codigo_barra }, 
    });


    if (!disfraz) {
      return res.status(404).json({ message: 'Disfraz no encontrado' });
    }

    res.json(disfraz);
  } catch (error) {
    console.error('Error al buscar el disfraz:', error);
    res.status(500).json({ error: 'Error al buscar el disfraz' });
  }
};
