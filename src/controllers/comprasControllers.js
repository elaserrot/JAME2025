const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
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

// Inicialización del cliente
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    options: { timeout: 5000 },
});

// Instancia de Preferencia
const preference = new Preference(client);

// Controlador para listar las compras 
exports.listarCompras = async (req, res) => {
    const q = "SELECT compras.* FROM compras";
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

exports.listarComprasUsuario = async (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM compras WHERE id_user = ?";
    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
}

// Controlador para agregar compras
exports.agregarCompra = async (req, res) => {
    const q = `
            INSERT INTO compras 
            (payment_id, status, fecha_aprobacion, metodo_pago, monto, descripcion)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    const payment_id = req.body.payment_id;
    const status = req.body.status;
    const fecha_aprobacion = req.body.fecha_aprobacion;
    const metodo_pago = req.body.metodo_pago;
    const monto = req.body.monto;
    const descripcion = req.body.descripcion;

    conexion.query(q, [payment_id, status, fecha_aprobacion, metodo_pago, monto, descripcion], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json("Error al agregar la compra");
        } else {
            res.status(200).json("Compra agregada correctamente");
        }
    });
};

exports.actualizarCompra = async (req, res) => {
    const { id } = req.params;
    const { payment_id, status, fecha_aprobacion, metodo_pago, monto, descripcion } = req.body;

    const q = `
            UPDATE compras
            SET payment_id = ?, status = ?, fecha_aprobacion = ?, metodo_pago = ?, monto = ?, descripcion = ?
            WHERE ID_Compra = ?
        `;

    conexion.query(q, [payment_id, status, fecha_aprobacion, metodo_pago, monto, descripcion, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json("Error al actualizar la compra");
        } else {
            res.status(200).json("Compra actualizada correctamente");
        }
    });
}

// Controlador para eliminar una compra por ID_Compra
exports.eliminarCompra = async (req, res) => {
    const { id } = req.params;

    const q = "DELETE FROM compras WHERE ID_Compra = ?";

    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error al eliminar la compra");
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Compra no encontrada" });
        }

        res.status(200).json("Compra eliminada correctamente");
    });
};

exports.crearPago = async (req, res) => {
    const { title, unit_price } = req.body;
    const url = "https://main.d1pk7hlxc4temi.amplifyapp.com"; 

    const body = {
        items: [
            {
                title,
                quantity: 1,
                unit_price: parseFloat(unit_price),
                currency_id: "COP",
            },
        ],
            back_urls: {
                success: `${url}/success`,
                failure: `${url}/failure`,
                pending: `${url}/pending`,
            },
        auto_return: "approved",
    };

    try {
        const response = await preference.create({ body });
        res.status(200).json({ id: response.id, init_point: response.init_point });
    } catch (error) {
        console.error("Error al crear preferencia de pago:", error);
        res.status(500).json({ error: "Error al crear preferencia de pago" });
    }
};

exports.confirmarPago = async (req, res) => {
    const { paymentId, status } = req.body;

    try {
        // 1. Verificar el pago con MercadoPago
        const payment = new Payment(client);
        const paymentData = await payment.get({ id: paymentId });

        console.log("Datos del pago:", paymentData);

        // 2. Validar el estado del pago
        if (paymentData.status !== 'approved') {
            return res.status(400).json({
                error: "El pago no fue aprobado",
                status: paymentData.status
            });
        }

        // 3. Extraer información relevante
        const {
            id: mpPaymentId,
            status: mpStatus,
            date_approved,
            payment_method_id,
            transaction_amount,
            description
        } = paymentData;

        const userId = req.params.id;
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000);

        // 4. Registrar en tu base de datos
        const q = `
            INSERT INTO compras 
            (payment_id, status, fecha_aprobacion, metodo_pago, monto, descripcion, id_user, codigo_verificacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        conexion.query(q, [
            mpPaymentId,
            mpStatus,
            new Date(date_approved),
            payment_method_id,
            transaction_amount,
            description,
            userId,
            codigo_verificacion
        ], (err, resultado) => {
            if (err) {
                console.error("Error al registrar pago:", err);
                return res.status(500).json({ error: "Error al registrar pago" });
            }

            res.status(200).json({ message: "Pago registrado con exito" });
        });

    } catch (error) {
        console.error("Error confirmando pago:", error);
        res.status(500).json({
            error: "Error confirmando pago",
            details: error.message
        });
    }
};