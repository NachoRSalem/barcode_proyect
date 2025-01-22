const express = require('express');
const { getReservasByDisfraz, createReserva } = require('../controllers/reservasController');
const router = express.Router();

router.get('/:disfraz_id', getReservasByDisfraz);
router.post('/', createReserva);

module.exports = router;
