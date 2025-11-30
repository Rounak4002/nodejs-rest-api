// src/index.js
// Entrypoint and router

const express = require('express');
const dotenv = require('dotenv');
const notes = require('./controllers/notesController');

dotenv.config();

const app = express();
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Notes API - endpoints: GET /notes, GET /notes/:id, POST /notes, PUT /notes/:id, PATCH /notes/:id, DELETE /notes/:id'
  });
});

// Notes routes
app.get('/notes', notes.list);
app.get('/notes/:id', notes.getById);
app.post('/notes', notes.create);
app.put('/notes/:id', notes.update);
app.patch('/notes/:id', notes.update);
app.delete('/notes/:id', notes.remove);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
