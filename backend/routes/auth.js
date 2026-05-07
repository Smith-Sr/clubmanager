const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = 'clubmanager_secret_2024';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM trabajadores WHERE email=?', [email], (err, rows) => {
    if (err || rows.length === 0)
      return res.status(401).json({ error: 'Credenciales inválidas' });
    if (rows[0].password !== password)
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: rows[0].id, email }, SECRET, { expiresIn: '8h' });
    res.json({ token, nombre: rows[0].nombre });
  });
});

module.exports = router;