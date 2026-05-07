const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/socios',       require('./routes/socios'));
app.use('/api/reservas',     require('./routes/reservas'));
app.use('/api/instalaciones',require('./routes/instalaciones'));
app.use('/api/auth',         require('./routes/auth'));

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));



