const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT id, nombre, email, cargo, created_at FROM trabajadores', (err, rows) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.status(200).json({ ok: true, total: rows.length, data: rows });
  });
});

router.post('/', (req, res) => {
  const { nombre, email, password, cargo } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ ok: false, error: 'Campos requeridos' });
  db.query('INSERT INTO trabajadores (nombre, email, password, cargo) VALUES (?,?,?,?)',
    [nombre, email, password, cargo], (err, result) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.status(201).json({ ok: true, id: result.insertId, mensaje: 'Trabajador registrado' });
    });
});

module.exports = router;