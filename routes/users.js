const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Se importa el controller
const { check } = require("express-validator");

// Crear un usuario
router.post('/', [
    check('firstName', 'The firstname is required and must be at least 2 letters.').isLength({min:2}),
    check('lastName', 'The lastname is required and must be at least 2 letters.').isLength({min:2}),
    check('birthday', 'The birthday is required and must be a valid date.').isDate(),
    check('email', 'The email is required and must be a valid email address.').isEmail(),
    check('password', 'The password is required and must be at least 6 characters.').isLength({min:6})
], userController.userCreate);

module.exports = router;