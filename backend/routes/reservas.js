const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT r.*, s.nombre AS socio, i.nombre AS instalacion
    FROM reservas r
    JOIN socios s ON r.socio_id = s.id
    JOIN instalaciones i ON r.instalacion_id = i.id
    WHERE r.fecha = CURDATE()
    ORDER BY r.hora_inicio
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { socio_id, instalacion_id, fecha, hora_inicio, hora_fin } = req.body;
  const sql = `INSERT INTO reservas (socio_id, instalacion_id, fecha, hora_inicio, hora_fin)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [socio_id, instalacion_id, fecha, hora_inicio, hora_fin], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, mensaje: 'Reserva creada' });
  });
});

router.delete('/:id', (req, res) => {
  db.query('UPDATE reservas SET estado="cancelada" WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Reserva cancelada' });
  });
});

module.exports = router;