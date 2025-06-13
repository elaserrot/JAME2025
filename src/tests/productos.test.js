const mysql = require('mysql2');
const productosRepository = require('../repositories/productosRepository');

beforeAll((done) => {
    global.conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jame_test',
    });
    
    global.conexion.connect((err) => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return done(err);
        }
        // Deshabilitar checks de claves foráneas y truncar tabla
        global.conexion.query('SET FOREIGN_KEY_CHECKS = 0', (err) => {
            if (err) return done(err);
            
            global.conexion.query('TRUNCATE TABLE productos', (err) => {
                if (err) return done(err);
                done();
            });
        });
    });
});

afterAll((done) => {
    global.conexion.query('TRUNCATE TABLE productos', (err) => {
        if (err) {
            console.error('Error truncando tabla productos:', err);
            return global.conexion.end(() => done(err));
        }
        
        global.conexion.end((err) => {
            if (err) {
                console.error('Error cerrando conexión:', err);
                return done(err);
            }
            done();
        });
    });
});

describe('Test de productos', () => {
    let testCategoryId;
    const values = {
        nombre_producto: 'Producto Test',
        descripcion: 'Descripcion Test',
        precio: 100.00,
        stock: 10,
        imagen: 'imagen_test.jpg',
        id_cate: null
    }

    beforeAll(async () => {
        const result = await productosRepository.create(values.nombre_producto, values.descripcion, values.precio, values.stock, values.imagen, values.id_cate);
        testCategoryId = result.insertId;
    });

    test('Agregar producto', async () => {
        const resultado = await productosRepository.create(values.nombre_producto, values.descripcion, values.precio, values.stock, values.imagen, values.id_cate);
        expect(resultado.affectedRows).toBe(1);
    });

    test('Mostrar productos', async () => {
        const resultado = await productosRepository.getAll();
        expect(Array.isArray(resultado)).toBe(true);
    });

    test('Actualizar producto', async () => {
        const updatedValues = {
            nombre_producto: 'Producto Actualizado',
            descripcion: 'Descripcion Actualizada',
            precio: 150.00,
            stock: 20,
            imagen: 'imagen_actualizada.jpg',
            id_cate: 1
        };
        
        const resultado = await productosRepository.update(updatedValues.nombre_producto, updatedValues.descripcion, updatedValues.precio, updatedValues.stock, updatedValues.imagen, updatedValues.id_cate, testCategoryId);
        expect(resultado.affectedRows).toBe(1);
    });

    test('Obtener producto por ID', async () => {
        const resultado = await productosRepository.getById(testCategoryId);
        expect(resultado.id_cate).toBe(testCategoryId);
    });

    test('Eliminar producto', async () => {
        const resultado = await productosRepository.delete(testCategoryId);
        expect(resultado.affectedRows).toBe(1);
    });
});