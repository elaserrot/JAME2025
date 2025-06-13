// controllers/categoriaController.js
const categoriaRepository = require('../repositories/categoriaRepository');

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await categoriaRepository.getAll();
        res.status(200).json(categorias);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
};

exports.agregarCategoria = async (req, res) => {
    const { nombre_categoria, descripcion_categoria } = req.body;

    if (!nombre_categoria) {
        return res.status(400).json({ error: "El nombre de la categoria es obligatorio" });
    }

    try {
        await categoriaRepository.create(nombre_categoria, descripcion_categoria);
        res.status(200).json({ mensaje: "Categoría agregada con éxito" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al agregar la categoría" });
    }
};

exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria, descripcion_categoria } = req.body;

    if (!nombre_categoria) {
        return res.status(400).json({ error: "El nombre de la categoria es obligatorio" });
    }

    try {
        const resultado = await categoriaRepository.update(id, nombre_categoria, descripcion_categoria);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        res.status(200).json({ mensaje: "Categoría actualizada con éxito" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al actualizar la categoría" });
    }
};

exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await categoriaRepository.delete(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        res.status(200).json({ mensaje: "Categoría eliminada con éxito" });
    } catch (err) {
        console.error("Error al eliminar la categoría:", err);
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};