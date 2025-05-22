//Controlador para listar categorias
exports.listarCategorias = async (req, res) => {
    const q = "SELECT * FROM categorias";
    conexion.query(q, (err, resultado) => {
        if (err) {
            console.log(err)
            res.status(500).json("Error al obtener los resultados")
        }
        res.status(200).json(resultado)
    })
};

exports.agregarCategoria = async (req, res) => {
    const { nombre_categoria, descripcion_categoria } = req.body;

    if (!nombre_categoria) {
        return res.status(400).json({ error: "El nombre de la categoria es obligatorio" });
    }

    const q = "INSERT INTO categorias (nombre_categoria, descripcion_categoria) VALUES (?, ?)";

    conexion.query(q, [nombre_categoria, descripcion_categoria || null], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error al agregar la categoria");
        }

        res.status(200).json("Categoria agregada con exito");
    });
};



exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria, descripcion_categoria } = req.body;

    if (!nombre_categoria) {
        return res.status(400).json({ error: "El nombre de la categoria es obligatorio" });
    }

    const q = "UPDATE categorias SET nombre_categoria = ?, descripcion_categoria = ? WHERE id_categoria = ?";

    conexion.query(q, [nombre_categoria, descripcion_categoria || null, id], (err, resultado) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error al actualizar la categoria");
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json("Categoria no encontrada");
        }

        res.status(200).json("Categoria actualizada con exito");
    });
};


exports.eliminarCategoria = (req, res) => {
    const id = req.params.id;

    const q = "DELETE FROM categorias WHERE id_categoria = ?";

    conexion.query(q, [id], (err, resultado) => {
        if (err) {
            console.error("Error al eliminar la categoria:", err);
            return res.status(500).json({ error: "Error al eliminar la categoria" });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Categoria no encontrada" });
        }

        res.status(200).json({ mensaje: "Categoria eliminada con exito" });
    });
}