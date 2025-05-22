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
        rejectUnauthorized: false,
    },
})

exports.enviar = async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Nuevo mensaje de contacto de ${nombre}`,
            html: `
                <div class="container" style="background-color: #0DCAF0; color: #fff; padding: 80px;">
                    <h1>Contacto</h1>
                    <p style="font-weight: bold;">Nombre:</p>
                    <p>${nombre}</p>
                    <p style="font-weight: bold;">Correo:</p>
                    <p>${email}</p>
                    <p style="font-weight: bold;">Mensaje:</p>
                    <p>${mensaje}</p>
                </div>
            `,
        }
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Confirmación de contacto",
            html: `
                <div class="container" style="background-color: #0D6EFD; color: #fff; padding: 80px;">
                    <h1>Has enviado un mensaje a JAME</h1>
                    <p style="font-weight: bold;">Gracias por comunicarte con nosotros.</p>
                    <p>Te responderemos lo antes posible.</p>
                    <h1>Detalles del contacto</h1>
                    <p style="font-weight: bold;">Nombre:</p>
                    <p>${nombre}</p>
                    <p style="font-weight: bold;">Correo:</p>
                    <p>${email}</p>
                    <p style="font-weight: bold;">Mensaje:</p>
                    <p>${mensaje}</p>
                </div>
            `,
        }
        await transporter.sendMail(mailOptionsAdmin)
        await transporter.sendMail(mailOptionsUser)
        res.status(200).json({ success: true, message: "Correo enviado correctamente" })
    }
    catch (error) {
        console.error("Error al enviar el correo:", error)
        res.status(500).json({ success: false, message: "Error al enviar el correo" })
    }
}
