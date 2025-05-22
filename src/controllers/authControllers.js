const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
require("dotenv").config()

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ⚠️ Desactiva la verificación del certificado
  },
})

// Controlador para enviar código de recuperación
exports.enviarCodigo = (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ success: false, message: "El correo electrónico es requerido" })
  }

  // Verificar si el usuario existe
  const query = "SELECT * FROM usuarios WHERE correo_electronico = ?"
  conexion.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error al buscar usuario:", error)
      return res.status(500).json({ success: false, message: "Error al procesar la solicitud" })
    }

    // Si no encontramos el usuario
    if (results.length === 0) {
      // Por seguridad, no revelamos si el correo existe o no
      return res.json({ success: true, message: "Si el correo existe, recibirás un código de recuperación." })
    }

    // Generar código aleatorio
    const codigo = Math.floor(100000 + Math.random() * 900000)

    // Guardar el código en la base de datos
    const query = "UPDATE usuarios SET codigo = ?, codigo_expirate_date = DATE_ADD(NOW(), INTERVAL 20 MINUTE) WHERE correo_electronico = ?"
    conexion.query(query, [codigo, email], (error, results) => {
      if (error) {
        console.error("Error al guardar el código:", error)
        return res.status(500).json({ success: false, message: "Error al procesar la solicitud" })
      }
    })

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de recuperación de contraseña - Clínica Veterinaria Ciudad Canina",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Recuperación de Contraseña</h2>
    <p>Has solicitado restablecer tu contraseña para la Clínica Veterinaria Ciudad Canina.</p>
    <p>Tu código de verificación es: <strong style="font-size: 24px;">${codigo}</strong></p>
    <p>Este código expirará en 15 minutos.</p>
    <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
    <p>Saludos,<br>Equipo de Ciudad Canina</p>
  </div>
`,
    }

    // Enviar el correo
    transporter.sendMail(mailOptions, (emailError) => {
      if (emailError) {
        console.error("Error al enviar correo:", emailError)
        return res.status(500).json({ success: false, message: "Error al enviar el correo" })
      }

      res.json({ success: true, message: "Código enviado correctamente" })
    })
  })
}

// Controlador para verificar el código
exports.verificarCodigo = (req, res) => {
  const { email, codigo, nuevaContrasena, confirmarNuevaContrasena } = req.body

  if (!email || !codigo || !nuevaContrasena || !confirmarNuevaContrasena) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" })
  }

  if (nuevaContrasena !== confirmarNuevaContrasena) {
    return res.json({ success: false, message: "Las contrasenas no coinciden" })
  }

  // Verificar si hay un código pendiente para ese email

  conexion.query("SELECT * FROM usuarios WHERE correo_electronico = ?", [email], (error, results) => {
    if (error) {
      console.error("Error al buscar usuario:", error)
      return res.status(500).json({ success: false, message: "Error al procesar la solicitud" })
    }

    if (results.length === 0) {
      return res.json({ success: false, message: "Usuario no encontrado" })
    }

    const user = results[0]

    // Verificar si el código ha expirado
    if (Date.now() > user.codigo_expirate_date) {
      conexion.query("UPDATE usuarios SET codigo = NULL, codigo_expirate_date = NULL WHERE correo_electronico = ?", [email], (error, results) => {
        if (error) {
          console.error("Error al actualizar el código:", error)
          return res.status(500).json({ success: false, message: "Error al procesar la solicitud" })
        }
      })
      return res.json({ success: false, message: "El código ha expirado" })
    }
    if (!user.codigo) {
      return res.json({ success: false, message: "No se ha enviado un código de recuperación" })
    }
    if (user.codigo !== codigo) {
      return res.json({ success: false, message: "Código incorrecto" })
    }

    const contrasenaHash = bcrypt.hashSync(nuevaContrasena, 10)
    conexion.query("UPDATE usuarios SET contraseña = ?, codigo = NULL, codigo_expirate_date = NULL WHERE correo_electronico = ?", [contrasenaHash, email], (error, results) => {
      if (error) {
        console.error("Error al actualizar la contraseña:", error)
        return res.status(500).json({ success: false, message: "Error al procesar la solicitud" })
      }
      res.json({ success: true, message: "Contraseña actualizada correctamente" })
    })
  })


}

// Controlador para cambiar la contraseña
exports.cambiarContrasena = (req, res) => {
  const { email, token, nuevaContrasena } = req.body

  // Verificar token
  if (!codigosPendientes[email] || codigosPendientes[email].token !== token) {
    return res.json({ success: false, message: "Token inválido o expirado" })
  }

  try {
    // Verificar el JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave_secreta_temporal")

    if (decoded.tipo !== "reset_password" || decoded.email !== email) {
      return res.json({ success: false, message: "Token inválido" })
    }
    if (!nuevaContrasena || nuevaContrasena.length < 8) {
      return res.json({ success: false, message: "La nueva contraseña debe tener al menos 8 caracteres" })
    }


    // Hashear la nueva contraseña
    bcrypt.hash(nuevaContrasena, 10, (hashError, hashedPassword) => {
      if (hashError) {
        console.error("Error al hashear contraseña:", hashError)
        return res.status(500).json({ success: false, message: "Error al procesar la solicitud" })
      }

      // Actualizar contraseña en la base de datos
      const query = "UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?"
      conexion.query(query, [hashedPassword, decoded.id_usuario], (updateError, results) => {
        if (updateError) {
          console.error("Error al actualizar contraseña:", updateError)
          return res.status(500).json({ success: false, message: "Error al actualizar la contraseña" })
        }

        // Eliminar código pendiente
        delete codigosPendientes[email]

        res.json({ success: true, message: "Contraseña actualizada correctamente" })
      })
    })
  } catch (error) {
    console.error("Error al verificar token:", error)
    res.status(401).json({ success: false, message: "Token inválido o expirado" })
  }
}