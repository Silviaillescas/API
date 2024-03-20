import pool from './conn.js';

async function main() {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute("SELECT * FROM flowersblog_posts");
        console.log(rows);
        connection.release();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();

