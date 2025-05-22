require("dotenv").config()
// Inicialización del cliente
exports.listarCarrito = (req, res) => {
    const id = req.params.id
    conexion.query('SELECT * FROM carrito_compras INNER JOIN productos ON carrito_compras.id_producto = productos.id_producto WHERE id_usuario = ? AND carrito_estado = 1', [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener los productos del carrito" });
        }
        res.status(200).json(resultado);
    });

}
exports.agregarProducto = (req, res) => {
    const id_usuario = req.params.id
    const { id_producto } = req.body
    conexion.query('SELECT * FROM carrito_compras WHERE id_usuario = ? AND id_producto = ?', [id_usuario, id_producto], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al agregar el producto al carrito" });
        }
        if (resultado.length > 0) {
            this.sumarCantidad(req, res)
            return
        }
        conexion.query('INSERT INTO carrito_compras (id_usuario, id_producto, cantidad) VALUES (?, ?, 1)', [id_usuario, id_producto], (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al agregar el producto al carrito" });
            }
            return res.status(200).json({ message: "Producto agregado al carrito" });
        });
    })
}

exports.sumarCantidad = (req, res) => {
    const id_usuario = req.params.id;
    const { id_producto } = req.body;

    conexion.query(
        'UPDATE carrito_compras SET cantidad = cantidad + 1 WHERE id_usuario = ? AND id_producto = ? AND carrito_estado = 1',
        [id_usuario, id_producto],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al actualizar la cantidad del producto en el carrito" });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: "Producto no encontrado en el carrito del usuario" });
            }
            res.status(200).json({
                success: true,
                message: "Cantidad del producto incrementada exitosamente",
            });
        }
    );
}

exports.restarCantidad = (req, res) => {
    const id_usuario = req.params.id
    const { id_producto } = req.body
    conexion.query('UPDATE carrito_compras SET cantidad = cantidad - 1 WHERE id_usuario = ? AND id_producto = ? AND cantidad >= 2 AND carrito_estado = 1', [id_usuario, id_producto], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al agregar el producto al carrito" });
        }
        res.status(200).json({ message: "Se ha restado una unidad al producto del carrito" });
    });
}

exports.eliminarProducto = (req, res) => {
    const id_usuario = req.params.id
    const { id_producto } = req.body
    conexion.query('DELETE FROM carrito_compras WHERE id_usuario = ? AND id_producto = ? AND carrito_estado = 1', [id_usuario, id_producto], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al eliminar el producto del carrito" });
        }
        res.status(200).json({ message: "Producto eliminado del carrito" });
    });
}

exports.eliminarCarrito = (req, res) => {
    const id_usuario = req.params.id
    conexion.query('DELETE FROM carrito_compras WHERE id_usuario = ?', [id_usuario], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al eliminar el producto del carrito" });
        }
        res.status(200).json({ message: "Carrito eliminado" });
    });
}