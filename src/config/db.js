const mysql = require('mysql2');
require('dotenv').config();

const connectDB = async () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'jame',
        port: process.env.DB_PORT || 3306,
        connectTimeout: 10000,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    });

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Database connection error:', err);
                if (connection) connection.release();
                reject(err);
                process.exit(1);
            } else {
                console.log('Conectado a la base de datos');
                connection.release();
                global.conexion = pool;
                resolve(pool);
            }
        });
    });
};

module.exports = connectDB;
