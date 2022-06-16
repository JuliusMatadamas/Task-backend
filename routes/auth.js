const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Crear un usuario
router.post('/', [
    check('email', 'The email is required and must be a valid email address.').isEmail(),
    check('password', 'The password is required and must be at least 6 characters.').isLength({min:6})
], authController.authUser);

// Obtener el usuario
router.get('/', auth, authController.authVerify);

module.exports = router;