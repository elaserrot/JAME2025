const express = require('express')
const rolesController = require('../controllers/rolesControllers')

const router = express.Router();

// Ruta para listar usuarios
router.get("/listar", rolesController.listarRoles);

router.post("/agregar", rolesController.agregarRol);

router.put('/:id', rolesController.actualizarRol);

router.delete('/:id', rolesController.eliminarRol);



module.exports = router;








  