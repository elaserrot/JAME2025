const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');
const upload = require("../middlewares/uploadMiddleware");


// Rutas protegidas solo para admin
router.get("/listar", usersController.listarUsuarios);

// Rutas protegidas solo para admin
router.get("/clientes/", usersController.listarClientes);

router.get("/clientesLimitado/", usersController.listarClientesLimitado);

// Registro de usuario (público)
router.post("/agregar", usersController.registrar);

// Eliminar usuario (restringido a admin si deseas)
router.delete("/eliminar/:id", usersController.eliminar);

// Editar usuario (admin o el mismo usuario)
router.put("/editar/:id", usersController.editar);

// Actualización parcial del usuario
router.patch("/actualizar/:id", usersController.actualizar);

// Login
router.post("/login", usersController.login);

// Obtener perfil del usuario autenticado
router.get("/perfil/:id", usersController.obtenerPerfil);

// Actualizar perfil completo (autenticado)
router.put("/:id", upload.single("imagen"), usersController.actualizarUsuario);

module.exports = router;
