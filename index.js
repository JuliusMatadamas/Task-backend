const express = require("express");
const conectarDB = require("./config/db");

// Se crea el servidor
const app = express();

// Conectar a la bd
conectarDB();

// Se crea el puerto
const PORT = process.env.PORT || 4000;

// Rutas


// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});