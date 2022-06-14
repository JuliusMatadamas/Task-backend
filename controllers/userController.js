const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.userCreate = async (req, res) => {
    // Revisar si hay errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // extraer el email y el password
    const { email, password } = req.body;

    try {
        // Revisar que el usuario sea único en la BD
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({msg: 'Error: There is already a user with the email ' + email});
        }

        // Se crea la instancia de User
        user = new User(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        res.json({msg: "User created."});
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}