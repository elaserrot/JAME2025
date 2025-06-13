const mysql = require('mysql2');
const categoriaRepository = require('../repositories/categoriaRepository');

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
            
            global.conexion.query('TRUNCATE TABLE categorias', (err) => {
                if (err) return done(err);
                done();
            });
        });
    });
});

afterAll((done) => {
    global.conexion.query('TRUNCATE TABLE categorias', (err) => {
        if (err) {
            console.error('Error truncando tabla categorias:', err);
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

describe('Test de categorias', () => {
    let testCategoryId;

    beforeAll(async () => {
        const result = await categoriaRepository.create('Categoria Test', 'Descripcion Test');
        testCategoryId = result.insertId;
    });

    test('Agregar categoria', async () => {
        const nombre_categoria = 'Categoria Test';
        const descripcion_categoria = 'Descripcion Test';

        const resultado = await categoriaRepository.create(nombre_categoria, descripcion_categoria);
        expect(resultado.affectedRows).toBe(1);
    });

    test('Mostrar categorias', async () => {
        const resultado = await categoriaRepository.getAll();
        expect(Array.isArray(resultado)).toBe(true);
    });

    test('Actualizar categoria', async () => {
        const nombre_categoria = 'Categoria Actualizada';
        const descripcion_categoria = 'Descripcion Actualizada';

        const resultado = await categoriaRepository.update(
            testCategoryId, 
            nombre_categoria, 
            descripcion_categoria
        );
        expect(resultado.affectedRows).toBe(1);
    });

    test('Obtener categoria por ID', async () => {
        const resultado = await categoriaRepository.getById(testCategoryId);
        expect(resultado.id_cate).toBe(testCategoryId);
    });

    test('Eliminar categoria', async () => {
        const resultado = await categoriaRepository.delete(testCategoryId);
        expect(resultado.affectedRows).toBe(1);
    });
});