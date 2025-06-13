class CategoriaRepository {
    // Obtener todas las categorías
    async getAll() {
        return new Promise((resolve, reject) => {
            const q = "SELECT * FROM categorias";
            conexion.query(q, (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Crear una nueva categoría
    async create(nombre_categoria, descripcion_categoria) {
        return new Promise((resolve, reject) => {
            const q = "INSERT INTO categorias (nombre_categoria, Descripción_Categoria) VALUES (?, ?)";
            conexion.query(q, [nombre_categoria, descripcion_categoria || null], (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Actualizar una categoría existente
    async update(id_categoria, nombre_categoria, descripcion_categoria) {
        return new Promise((resolve, reject) => {
            const q = "UPDATE categorias SET nombre_categoria = ?, Descripción_Categoria = ? WHERE id_cate = ?";
            conexion.query(q, [nombre_categoria, descripcion_categoria || null, id_categoria], (err, resultado) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    // Eliminar una categoría
    async delete(id_categoria) {
        return new Promise((resolve, reject) => {
            const q = "DELETE FROM categorias WHERE id_cate = ?";
            conexion.query(q, [id_categoria], (err, resultado) => {
                if (err) {
                    console.error("Error al eliminar la categoria:", err);
                    reject(err);
                }
                resolve(resultado);
            });
        });
    }

    //Obtener una categoría por ID
    async getById(id_categoria) {
        return new Promise((resolve, reject) => {
            const q = "SELECT * FROM categorias WHERE id_cate = ?";
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