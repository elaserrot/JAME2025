const express = require('express')
const pedidoController = require('../controllers/pedidoControllers')

const router = express.Router();

// Ruta para listar pedidos
router.get("/listarPedidos", pedidoController.listarPedidos);
router.post("/agregarPedido", pedidoController.agregarPedido);
router.get("/agregarDetallesPedido/", pedidoController.agregarDetallesPedido);
router.delete("/eliminarPedido/:id", pedidoController.eliminarPedido);
router.put("/actualizarPedido/:id", pedidoController.actualizarPedido);



module.exports = router;        