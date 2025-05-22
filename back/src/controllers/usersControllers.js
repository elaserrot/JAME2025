const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// Controlador para listar usuarios
exports.listarUsuarios = async (req, res) => {
    const q = "SELECT * FROM usuarios";
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

exports.listarClientes = async (req, res) => {
    const q = "SELECT * FROM usuarios WHERE id_rol = 2 AND estado = 1";
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
}

exports.listarClientesLimitado = async (req, res) => {
    const q = "SELECT * FROM usuarios WHERE id_rol = 2 AND estado = 1 LIMIT 5";
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
}
/* registrar usuario */
exports.registrar = async (req, res) => {
    const { nombreCompleto, correoElectronico, usuario, contrasena } = req.body;
    if (!nombreCompleto || !correoElectronico || !usuario || !contrasena) {
        return res.status(400).json({ error: 'debes completar todo los campos' });

    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoElectronico)) {
        return res.status(400).json({ error: 'El correo electrónico no es válido' });
    }
    else if (contrasena.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }
    const passwordHash = bcrypt.hashSync(contrasena, 10)
    const q = "INSERT INTO `usuarios`( `nombre_completo`, `correo_electronico`, `usuario`, `contraseña`) VALUES (?)"
    const values = [
        nombreCompleto, correoElectronico, usuario, passwordHash
    ]
    conexion.query(q, [values], (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al registrar un usuario")
        }

        res.status(200).json("Usuario Registrado correctamente")
    })
}

exports.eliminar = async (req, res) => {
    const { id } = req.params;
    const q = "UPDATE usuarios SET estado = 0 WHERE id_usuario = ?";
    conexion.query(q, [id], (err, result) => {
        if (err) {

            return res.status(500).json({
                error: 'Error al eliminar el usuario',

            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado con ese ID' });
        }

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    });
};

exports.editar = async (req, res) => {

    const { id } = req.params;
    const { nombrecompleto, correoelectronico, usuario, contraseña } = req.body;

    // Validar que todos los campos están presentes
    if (!id || !nombrecompleto || !correoelectronico || !usuario || !contraseña) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const q = "UPDATE usuarios SET nombre_completo = ?, correo_electronico = ?, usuario = ?, contraseña = ? WHERE id_usuario = ?";

    conexion.query(q, [nombrecompleto, correoelectronico, usuario, contraseña, id], (err, result) => {
        if (err) {

            return res.status(500).json({ error: "Error al actualizar el usuario", details: err.sqlMessage });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado con ese ID" });
        }

        res.status(200).json({ message: "Usuario actualizado correctamente" });
    });
};

exports.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombrecompleto, correoelectronico, usuario, contraseña } = req.body;

    // Verificar si al menos un campo fue enviado para actualizar
    if (!nombrecompleto && !correoelectronico && !usuario && !contraseña) {
        return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
    }

    // Construcción dinámica de la consulta SQL
    let campos = [];
    let valores = [];

    if (nombrecompleto) {
        campos.push("nombre_completo = ?");
        valores.push(nombrecompleto);
    }
    if (correoelectronico) {
        campos.push("correo_electronico = ?");
        valores.push(correoelectronico);
    }
    if (usuario) {
        campos.push("usuario = ?");
        valores.push(usuario);
    }
    if (contraseña) {
        campos.push("contraseña = ?");
        valores.push(contraseña);
    }

    valores.push(id); // Agregar el ID al final para la condición WHERE

    const q = `UPDATE usuarios SET ${campos.join(", ")} WHERE id_usuario = ?`;

    conexion.query(q, valores, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el usuario", details: err.sqlMessage });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado con ese ID" });
        }

        res.status(200).json({ message: "Usuario actualizado correctamente" });
    });
};

// Ruta para iniciar sesión
exports.login = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }

    const q = "SELECT * FROM usuarios WHERE correo_electronico = ?";
    conexion.query(q, [correo], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error en la base de datos", details: err });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: "Correo no registrado" });
        }

        const usuario = result[0];
        const contraseñaValida = await bcrypt.compare(password, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar token
        const token = jwt.sign(
            { id: usuario.id_usuario, correo: usuario.correo_electronico, rol: usuario.id_rol },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Opcional: puedes omitir la contraseña al devolver el usuario
        delete usuario.contraseña;

        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token,
            usuario
        });
    });
};

// GET /api/usuarios/perfil
exports.obtenerPerfil = (req, res) => {
    const id_usuario = req.params.id;

    conexion.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario], (err, results) => {
        if (err) {
            console.error("Error al obtener perfil:", err);
            return res.status(500).json({ mensaje: "Error al obtener el perfil" });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Solo entra aquí si todo salió bien y solo se envía una respuesta
        return res.json({ usuario: results[0] });
    });
};

exports.actualizarUsuario = (req, res) => {
    console.log('ACTUALIZANDO USUARIO');
    const id_usuario = req.params.id;
    const { nombre_completo, usuario, telefono, direccion } = req.body;

    // 1) Consulta la fila actual para sacar el nombre de la imagen "vieja"
    conexion.query(
        'SELECT imagen FROM usuarios WHERE id_usuario = ?',
        [id_usuario],
        (err, results) => {
            if (err) {
                console.error('Error al leer usuario antes de actualizar:', err);
                return res.status(500).json({ mensaje: 'Error interno' });
            }
            if (results.length === 0) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            const imagenVieja = results[0].imagen; // puede ser null o un nombre de archivo
            // 2) Si subieron nueva imagen, la borramos de disco
            let nombreImagen = imagenVieja;
            if (req.file) {
                nombreImagen = req.file.filename;
                if (imagenVieja) {
                    const rutaVieja = path.join(__dirname, '..', 'USUARIOS_FOTOS', imagenVieja);
                    if (fs.existsSync(rutaVieja)) {
                        try {
                            fs.unlinkSync(rutaVieja);
                        } catch (e) {
                            console.warn('No se pudo borrar imagen vieja (quizá ya no existía):', rutaVieja);
                        }
                    }
                }
            }

            // 3) Hacemos el UPDATE ya con el nombre correcto de la imagen
            const q = `
                UPDATE usuarios SET 
                nombre_completo = ?, 
                usuario         = ?, 
                telefono        = ?, 
                direccion       = ?, 
                imagen          = ?
                WHERE id_usuario  = ?
            `;
            const valores = [nombre_completo, usuario, telefono, direccion, nombreImagen, id_usuario];
            conexion.query(q, valores, (err2) => {
                if (err2) {
                    console.error('Error al actualizar usuario:', err2);
                    return res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
                }
                res.json({ mensaje: 'Usuario actualizado correctamente' });
            });
        }
    );
};