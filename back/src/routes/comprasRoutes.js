const express = require('express')
const comprasController = require('../controllers/comprasControllers')

const router = express.Router();

// Ruta para listar compras
router.get("/listar", comprasController.listarCompras);

router.get("/listar/cliente/:id", comprasController.listarComprasUsuario);

router.post("/agregar", comprasController.agregarCompra);

router.put("/:id", comprasController.actualizarCompra);

router.delete("/:id", comprasController.eliminarCompra);

router.post("/crear-pago", comprasController.crearPago);

router.post("/confirmar-pago/:id", comprasController.confirmarPago);

module.exports = router;