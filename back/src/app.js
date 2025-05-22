
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require("./routes/authRoutes")
const usersRoutes = require('./routes/usersRoutes')
const mascotasRoutes = require('./routes/mascotasRoutes')
const citasRoutes = require('./routes/citasRoutes')
const rolesRoutes = require('./routes/rolesRoutes');
const requestLogger = require('./middlewares/requestLogger');
const productosRoutes = require('./routes/productosRoutes')
const comprasRoutes = require('./routes/comprasRoutes')
const contactoRoutes = require('./routes/contactoRoutes')
const carritoRoutes = require('./routes/carritoRoutes')
const path = require('path');

const pedidoRoutes = require('./routes/pedidoRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const createApp = () => {
    const app = express();

    app.use(cors({
        origin: (origin, callback) => {
            console.log('\nrequest origin: ', origin);
            callback(null, true);
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    }));

    // Middleware para analizar el cuerpo de las solicitudes
    app.use(express.json());

    app.use(requestLogger);


    app.get('/', (req, res) => {
        res.send('Bienvenido a la API de JAME')
    })

    // Swagger docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // Rutas
    app.use('/api/auth', authRoutes);
    app.use('/api/carrito', carritoRoutes);
    app.use('/api/categorias', categoriaRoutes);
    app.use('/api/citas', citasRoutes);
    app.use('/api/compras', comprasRoutes);
    app.use('/api/contacto', contactoRoutes);
    app.use('/api/mascota', mascotasRoutes);
    app.use('/api/pedidos', pedidoRoutes);
    app.use('/api/productos', productosRoutes);
    app.use('/api/roles', rolesRoutes);
    app.use('/api/usuarios', usersRoutes);
    app.use('/USUARIOS_FOTOS', express.static(path.join(__dirname, 'USUARIOS_FOTOS')));
    app.use('/PRODUCTOS_FOTOS', express.static(path.join(__dirname, 'PRODUCTOS_FOTOS')));
    app.use("/uploads", express.static("uploads"));

    return app
}

module.exports = createApp