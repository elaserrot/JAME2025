// Controlador para listar citas
exports.listarCitas = async (req, res) => {
    const q = `SELECT 
    ID_Citas, 
    citas.ID_Usuario, 
    Fecha_Cita, 
    Motivo_Cita, 
    Estado_Cita, 
    citas.ID_Mascota, 
    mascota.Nombre_Mascota, 
    usuarios.nombre_completo 
    FROM citas 
    INNER JOIN usuarios ON citas.ID_Usuario = usuarios.id_usuario 
    INNER JOIN mascota ON citas.ID_Mascota = mascota.ID_Mascota`;
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

exports.listarCitasUsuario = async (req, res) => {
    const id = req.params.id;
    const q = `SELECT 
    ID_Citas, 
    citas.ID_Usuario, 
    Fecha_Cita, 
    Motivo_Cita, 
    Estado_Cita, 
    citas.ID_Mascota, 
    mascota.Nombre_Mascota, 
    usuarios.nombre_completo 
    FROM citas 
    INNER JOIN usuarios ON citas.ID_Usuario = usuarios.id_usuario 
    INNER JOIN mascota ON citas.ID_Mascota = mascota.ID_Mascota
    WHERE citas.ID_Usuario = ?`;
    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

//controlador para agregar citas
exports.agregarCita = async (req, res) => {
    const { Usuario, Fecha, Motivo, Estado, Mascota } = req.body;

    if (!Usuario || !Fecha || !Motivo || !Estado || !Mascota) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const q = "INSERT INTO citas (ID_Usuario , Fecha_Cita, Motivo_Cita, Estado_Cita, ID_Mascota) VALUES (?, ?, ?, ?, ?)";

    conexion.query(q, [Usuario, Fecha, Motivo, Estado, Mascota], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error al agregar la cita");
        }

        res.status(200).json("Cita agregada con éxito");
    });
};

//Controlador para eliminar cita
exports.eliminarCita = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID de la cita es obligatorio" });
    }

    const q = "DELETE FROM citas WHERE ID_Citas = ?";


    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al eliminar la cita" });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }

        res.status(200).json({ mensaje: "Cita eliminada con éxito" });
    });
};

//CONTROLADOR PARA ACTUALIZAR CITAS
exports.actualizarCita = async (req, res) => {
    const { id } = req.params;
    const { usuario, fecha, motivo, estado, mascota } = req.body;

    const q = `
        UPDATE citas 
        SET 
            Usuario = ?, 
            Fecha = ?, 
            Motivo = ?, 
            Estado = ?, 
            Mascota = ?
        WHERE ID_Citas = ?
    `;

    conexion.query(q, [usuario, fecha, motivo, estado, mascota, id], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al actualizar la cita" });
        }
        res.status(200).json({ mensaje: "Cita actualizada con éxito" });
    });
};


//Controlador para actualizar a un solo dato 
exports.actualizarCitaUnica = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;


    if (Object.keys(campos).length === 0) {
        return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }


    const columnas = [];
    const valores = [];

    for (let key in campos) {
        columnas.push(`${key} = ?`);
        valores.push(campos[key]);
    }

    const q = `
        UPDATE citas 
        SET ${columnas.join(", ")}
        WHERE ID_Citas = ?
    `;

    valores.push(id);

    conexion.query(q, valores, (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al actualizar la cita" });
        }

        res.status(200).json({ mensaje: "Cita actualizada con éxito" });
    });
};

exports.cambiarEstado = async (req, res) => {
    const { id } = req.params;
    const estado = req.body.Estado_Cita;
    const q = `UPDATE citas SET Estado_Cita = ? WHERE ID_Citas = ?`;
    conexion.query(q, [estado, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al aceptar la cita" });
        }
        res.status(200).json({ message: "Cita aceptada con éxito" });
    });
}