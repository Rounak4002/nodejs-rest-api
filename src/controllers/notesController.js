// src/controllers/notesController.js
// CRUD handlers for notes

const pool = require('../db');

async function list(req, res) {
  try {
    const [rows] = await pool.query('SELECT id, title, content, created_at, updated_at FROM notes ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function getById(req, res) {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query('SELECT id, title, content, created_at, updated_at FROM notes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Note not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function create(req, res) {
  try {
    const { title, content } = req.body || {};
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    const [result] = await pool.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title.trim(), content || null]);
    res.status(201).json({ id: result.insertId, message: 'Note created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body || {};

    // Check exists
    const [check] = await pool.query('SELECT id FROM notes WHERE id = ?', [id]);
    if (check.length === 0) return res.status(404).json({ error: 'Note not found' });

    const fields = [];
    const params = [];

    if (title !== undefined) {
      fields.push('title = ?');
      params.push(title);
    }
    if (content !== undefined) {
      fields.push('content = ?');
      params.push(content);
    }

    if (fields.length === 0) {
      return res.json({ message: 'Nothing to update' });
    }

    params.push(id);
    const sql = `UPDATE notes SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(sql, params);
    res.json({ message: 'Note updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
