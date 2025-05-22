// Controlador para listar los roles
exports.listarRoles = async (req, res) => {
    const q = "SELECT * FROM roles";
    conexion.query(q, (err, resultado) =>{
        if (err){
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

// Controlador para agregar rol
exports.agregarRol = async (req, res) => {
    const { nombre_rol } = req.body;

    if (!nombre_rol) {
        return res.status(400).json({ error: "El nombre del rol es obligatorio" });
    }

    const q = "INSERT INTO roles (nombre_rol) VALUES (?)";

    conexion.query(q, [nombre_rol], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error al agregar el rol");
        }

        res.status(200).json("Rol agregado con éxito");
    });
};

//Controlador para actualizar rol
exports.actualizarRol = async (req, res) => {
    const { id } = req.params;
    const { nombre_rol } = req.body;

    if (!nombre_rol) {
        return res.status(400).json({ error: "El nombre del rol es obligatorio" });
    }

    const q = "UPDATE roles SET nombre_rol = ? WHERE id_rol = ?";

    conexion.query(q, [nombre_rol, id], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error al actualizar el rol");
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json("rol no encontrado");
        }

        res.status(200).json("rol actualizado con éxito");
    });
};
// Controlador para eliminar Rol 

exports.eliminarRol = (req, res) => {
    const id = req.params.id;

    const q = "DELETE FROM roles WHERE id_rol = ?";
    
    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.error("Error al eliminar el rol:", err);
            return res.status(500).json({ error: "Error al eliminar el rol" });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Rol no encontrado" });
        }

        res.status(200).json({ mensaje: "Rol eliminado con éxito" });
    });
};




