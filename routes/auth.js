const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

// Crear un usuario
router.post('/', [
    check('email', 'The email is required and must be a valid email address.').isEmail(),
    check('password', 'The password is required and must be at least 6 characters.').isLength({min:6})
], authController.authUser);

module.exports = router;