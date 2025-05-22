const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoControllers');

// Rutas CRUD
router.get('/listar/:id', carritoController.listarCarrito);
router.post('/agregar/:id', carritoController.agregarProducto);
router.put('/restarCantidad/:id', carritoController.restarCantidad);
router.put('/sumarCantidad/:id', carritoController.sumarCantidad);
router.delete('/eliminarProducto/:id', carritoController.eliminarProducto);
router.delete('/eliminarCarrito/:id', carritoController.eliminarCarrito);


module.exports = router;
