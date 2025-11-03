const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'lojaDB',
    port: 3308,
    waitForConnections: true, //Aguarda conexões livres
    connectionLimit: 10, // Limita o número de conexões simultâneas
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`Conectado ao MYSQL`);
        connection.release();
    } catch (error) {
        console.error(`Erro ao conectar ao MYSQL: ${error}`);
    }
})();

module.exports = pool;