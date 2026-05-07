const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM socios WHERE estado = "activo"', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { nombre, dni, email, telefono, tipo_membresia, fecha_vencimiento } = req.body;
  const sql = `INSERT INTO socios (nombre, dni, email, telefono, tipo_membresia, fecha_vencimiento)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nombre, dni, email, telefono, tipo_membresia, fecha_vencimiento], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, mensaje: 'Socio registrado' });
  });
});

module.exports = router;