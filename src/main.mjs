import express from 'express';
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from '../db.js';

const app = express();
app.use(express.json());

// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = await createPost(title, content);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para obtener un post por ID
app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para actualizar un post por ID
app.put('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = await updatePost(postId, title, content);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para eliminar un post por ID
app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {
        const result = await deletePost(postId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Escuchando en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
