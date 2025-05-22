const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaControllers');

// Rutas CRUD
router.get('/listar/', categoriaController.listarCategorias);
router.post('/agregar/', categoriaController.agregarCategoria);
router.put('/actualizar/:id', categoriaController.actualizarCategoria);
router.delete('/eliminar/:id', categoriaController.eliminarCategoria);


module.exports = router;
