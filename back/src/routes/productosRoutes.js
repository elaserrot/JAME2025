// routes.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const upload = require("../middlewares/uploadProductosMiddleware");

// Definir las rutas
router.get('/listar', productosController.listarProductos);

router.get('/listarLimitado', productosController.listarLimitado);

router.get('/listar/:id', productosController.listarProductoPorId);

router.post('/agregar', upload.single("imagen"), productosController.agregarProducto);

router.delete('/eliminar/:id', productosController.eliminarProducto);

router.put('/actualizar/:id', upload.single("imagen"), productosController.actualizarProducto);

module.exports = router;
