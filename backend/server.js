const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/socios',    require('./routes/socios'));
app.use('/api/reservas',  require('./routes/reservas'));
app.use('/api/auth',      require('./routes/auth'));

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));