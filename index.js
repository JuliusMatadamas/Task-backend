const express = require("express");
const conectarDB = require("./config/db");

// Se crea el servidor
const app = express();

// Conectar a la bd
conectarDB();

// Se habilita express.json
app.use(express.json({ extended: true }));

// Se crea el puerto
const PORT = process.env.PORT || 4000;

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));


// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});