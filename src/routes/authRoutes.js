const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/authControllers")
const { verificarToken } = require("../middlewares/authMiddleware")

// Ruta para enviar código de recuperación
router.post("/enviarCodigo", authControllers.enviarCodigo)

// Ruta para verificar el código
router.post("/verificarCodigo", authControllers.verificarCodigo)

// Ruta para cambiar la contraseña
router.post("/cambiarContrasena", authControllers.cambiarContrasena)

router.get("/validarToken", verificarToken)

module.exports = router