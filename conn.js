import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "silviai",
    password: "Silvia#Ingenieria12",
    database: "flowersblog",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testDatabaseConnection();

export default pool;

