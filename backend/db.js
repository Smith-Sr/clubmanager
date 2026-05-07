const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clubmanager'
});

db.connect(err => {
  if (err) console.error('Error DB:', err);
  else console.log('MySQL conectado');
});

module.exports = db;