const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
const verificarToken = (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token no proporcionado o mal formado" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido o expirado" });
        }

        req.user = decoded;
        res.status(200).json({ decoded: decoded, rol: decoded.rol, success: true, message: "Token válido" });
    });
};

// Middleware para verificar rol de usuario (admin, user, etc.)
const verificarRol = (rolPermitido) => {
    return (req, res, next) => {
        if (!req.user || req.user.rol !== rolPermitido) {
            return res.status(403).json({ error: "Acceso denegado. No tienes permisos suficientes" });
        }
        next();
    };
};

module.exports = {
    verificarToken,
    verificarRol
};
