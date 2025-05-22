const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.post("/enviar", contactoController.enviar);

module.exports = router;     