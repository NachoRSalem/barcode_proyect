const express = require('express');
const { getDisfrazByCodigo } = require('../controllers/disfracesController');
const router = express.Router();

router.get('/:codigo_barra', getDisfrazByCodigo);

module.exports = router;
