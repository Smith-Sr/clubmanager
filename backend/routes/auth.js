const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const db      = require('../db');
const SECRET  = 'clubmanager_secret_2024';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM trabajadores WHERE email=?', [email], (err, rows) => {
    if (err || rows.length === 0)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const trabajador = rows[0];
    if (trabajador.password !== password)   // en producción usa bcrypt
      return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: trabajador.id, email }, SECRET, { expiresIn: '8h' });
    res.json({ token, nombre: trabajador.nombre });
  });
});

module.exports = router;