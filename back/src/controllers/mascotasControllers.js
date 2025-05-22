// Controlador para listar mascotas
exports.listarMascota = async (req, res) => {
    const q = "SELECT * FROM mascota INNER JOIN usuarios ON mascota.ID_Usuario = usuarios.id_usuario WHERE mascota.Estado_Mascota = 1 ORDER BY mascota.ID_Mascota DESC";
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

exports.listarMascotaPorCliente = async (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM mascota INNER JOIN usuarios ON mascota.ID_Usuario = usuarios.id_usuario WHERE mascota.Estado_Mascota = 1 AND mascota.ID_Usuario = ? ORDER BY mascota.ID_Mascota DESC";
    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
}

// Controlador para agregar mascota
exports.agregarMascota = async (req, res) => {
    const { Nombre_Mascota, Edad_Mascota, Fecha_nacimiento, Raza_Mascota, ID_Usuario, Observaciones_Mascota } = req.body;
    if (!Nombre_Mascota || !Edad_Mascota || !Fecha_nacimiento || !Raza_Mascota || !ID_Usuario || !Observaciones_Mascota) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    const values = [Nombre_Mascota, Edad_Mascota, Fecha_nacimiento, Raza_Mascota, Observaciones_Mascota, ID_Usuario];
    const q = "INSERT INTO `mascota`(`Nombre_Mascota`, `Edad_Mascota`, `Fecha_nacimiento`, `Raza_Mascota`, `Observaciones_Mascota`, `ID_Usuario`) VALUES (?, ?, ?, ?, ?, ?)";
    conexion.query(q, values, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al agregar la mascota")
        }
        res.status(200).json("Mascota agregada con éxito")
    })
};

//Controlador para eliminar mascota
exports.eliminarMascota = (req, res) => {
    const { id } = req.params;

    conexion.query('UPDATE mascota SET Estado_Mascota = 0 WHERE ID_Mascota = ?', [id], (error, resultado) => {
        if (error) {
            console.error('Error al eliminar la mascota:', error);
            return res.status(500).json({ mensaje: 'Error al eliminar la mascota' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }

        res.status(200).json({ mensaje: 'Mascota eliminada correctamente' });
    });
};

//Controlador para actualizar mascota
exports.actualizarMascota = (req, res) => {
    const { id } = req.params;
    conexion.query('SELECT * FROM mascota WHERE ID_Mascota = ?', [id], (error, resultado) => {
        const mascota = resultado[0];
        const { nombre, edad, raza, dueño, fecha } = req.body;
        if (!nombre || !edad || !raza || !dueño || !fecha) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }
        const q = "UPDATE mascota SET Nombre_Mascota = ? , `Edad_Mascota` = ?, `Fecha_nacimiento` = ?, `Raza_Mascota` = ?, `ID_Usuario` = ? WHERE ID_Mascota = ?";
        const values = [
            nombre ? nombre : mascota.Nombre_Mascota,
            edad ? edad : mascota.Edad_Mascota,
            fecha ? fecha : mascota.Fecha_nacimiento,
            raza ? raza : mascota.Raza_Mascota,
            dueño ? dueño : mascota.ID_Usuario
        ]
        conexion.query(q, [...values, id], (err
            , resultado) => {
            if (err) {
                console.log(err)
                res.status(500).json("Error al actualizar la mascota")
            }
            res.status(200).json("Mascota actualizada con éxito")
        })
    })

};

// Controlador para editar un solo dato 
exports.editarMascota = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, raza, dueño, fecha } = req.body;

    // Verificar si al menos un campo fue enviado para actualizar
    if (!nombre && !edad && !raza && !dueño && !fecha) {
        return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
    }

    // Construcción dinámica de la consulta SQL
    let campos = [];
    let valores = [];

    if (nombre) {
        campos.push("Nombre_Mascota = ?");
        valores.push(nombre);
    }
    if (edad) {
        campos.push("Edad_Mascota = ?");
        valores.push(edad);
    }
    if (raza) {
        campos.push("Raza_Mascota = ?");
        valores.push(raza);
    }
    if (dueño) {
        campos.push("ID_Usuario = ?");
        valores.push(dueño);
    }
    if (fecha) {
        campos.push("Fecha_nacimiento = ?");
        valores.push(fecha);
    }

    valores.push(id); // Agregar el ID al final para la condición WHERE

    const q = `UPDATE mascotas SET ${campos.join(", ")} WHERE ID_Mascota = ?`;

    conexion.query(q, valores, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar la mascota", details: err.sqlMessage });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Mascota no encontrada con ese ID" });
        }
        res.status(200).json({ message: "Mascota actualizada correctamente" });
    });
};





