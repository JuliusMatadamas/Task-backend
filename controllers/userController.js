const User = require("../models/User");

exports.userCreate = async (req, res) => {
    // extraer el email y el password
    const { email, password } = req.body;

    try {
        // Revisar que el usuario sea único en la BD
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({msg: 'Error: There is already a user with the email ' + email});
        }

        user = new User(req.body);

        await user.save();

        res.json({msg: "User created."});
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}