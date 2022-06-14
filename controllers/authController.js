const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
    // Revisar si hay errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // extraer el email y el password
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Si el usuario no está registrado
        if (!user) {
            return res.status(400).json({msg: 'Error: User does not exist.'});
        }

        // Se verifica el password
        const passwordCorrect = await bcryptjs.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({msg: 'Error: These credentials do not match our records..'});
        }

        // Se crea el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) {
                throw error;
            }

            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}