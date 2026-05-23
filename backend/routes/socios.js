const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM socios WHERE estado = "activo"', (err, rows) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.status(200).json({ ok: true, total: rows.length, data: rows });
  });
});

router.post('/', (req, res) => {
  const { nombre, dni, email, telefono, tipo_membresia, fecha_vencimiento } = req.body;
  if (!nombre || !dni) return res.status(400).json({ ok: false, error: 'Nombre y DNI son requeridos' });
  const sql = `INSERT INTO socios (nombre, dni, email, telefono, tipo_membresia, fecha_vencimiento)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nombre, dni, email, telefono, tipo_membresia, fecha_vencimiento], (err, result) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.status(201).json({ ok: true, id: result.insertId, mensaje: 'Socio registrado' });
  });
});

module.exports = router;