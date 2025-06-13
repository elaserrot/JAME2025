class CategoriaRepository {
    // Obtener todos los productos
    async getAll() {
        return new Promise((resolve, reject) => {
            const q = "SELECT * FROM productos";
            conexion.query(q, (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Crear un nuevo producto
    async create(nombre_producto, descripcion, precio, stock, imagen, id_cate) {
        return new Promise((resolve, reject) => {
            const q = "INSERT INTO productos (nombre_producto, descripcion, precio, stock, imagen, id_cate) VALUES (?, ?, ?, ?, ?, ?)";
            conexion.query(q, [nombre_producto, descripcion, precio, stock, imagen, id_cate], (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Actualizar un producto existente
    async update(nombre_producto, descripcion, precio, stock, imagen, id_cate, id_producto) {
        return new Promise((resolve, reject) => {
            const q = "UPDATE productos SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, id_cate = ? WHERE id_producto = ?";
            conexion.query(q, [nombre_producto, descripcion, precio, stock, imagen, id_cate, id_producto], (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Eliminar un producto
    async delete(id_categoria) {
        return new Promise((resolve, reject) => {
            const q = "DELETE FROM productos WHERE id_producto = ?";
            conexion.query(q, [id_categoria], (err, resultado) => {
                if (err) {
                    console.error("Error al eliminar la categoria:", err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Obtener un producto por ID
    async getById(id_categoria) {
        return new Promise((resolve, reject) => {
            const q = "SELECT * FROM productos WHERE id_producto = ?";
            conexion.query(q, [id_categoria], (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado[0]);
            });
        });
    }
}

module.exports = new CategoriaRepository();