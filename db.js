import conn from './conn.js';

// Obtener todos los posts
export async function getAllPosts() {
    const connection = await conn.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM flowersblog_posts');
        return rows;
    } finally {
        connection.release(); // Liberar la conexión después de usarla
    }
}

// Crear un nuevo post
export async function createPost(flowerName, color, season) {
   console.log('Creating new post...'); // Mensaje antes de ejecutar la consulta

   const connection = await conn.getConnection();
    try {
        // Utiliza los nombres de columnas correctos en la consulta SQL
        const [result] = await connection.query('INSERT INTO flowersblog_posts (flower_name, color, season) VALUES (?, ?, ?)', [flowerName, color, season]);
        console.log('New post created successfully:', result);
        return result;
    } catch (error) {
        // Maneja el error de manera más específica y devuelve un mensaje descriptivo
        console.error('Error creating post:', error);
        throw new Error('Error creating post');
    } finally {
        connection.release(); // Liberar la conexión después de usarla
    }
}


// Borrar un post por ID
export async function deletePost(postId) {
    const connection = await conn.getConnection();
    try {
        const [result] = await connection.query('DELETE FROM flowersblog_posts WHERE id = ?', [postId]);
        return result;
    } finally {
        connection.release(); // Liberar la conexión después de usarla
    }
}

// Obtener un post por ID
export async function getPostById(postId) {
    const connection = await conn.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM flowersblog_posts WHERE id = ?', [postId]);
        return rows[0]; // Suponiendo que el ID es único, devolvemos el primer resultado
    } finally {
        connection.release(); // Liberar la conexión después de usarla
    }
}
// Actualizar un post por ID
export async function updatePost(postId, flowerName, color, season) {
    const connection = await conn.getConnection();
    try {
        // Utiliza los nombres de columnas correctos en la consulta SQL
        const [result] = await connection.query('UPDATE flowersblog_posts SET flower_name = ?, color = ?, season = ? WHERE id = ?', [flowerName, color, season, postId]);
        return result;
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Error updating post');
    } finally {
        connection.release(); // Liberar la conexión después de usarla
    }
}
