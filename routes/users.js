const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Se importa el controller

// Crear un usuario
router.post('/', userController.userCreate);

module.exports = router;