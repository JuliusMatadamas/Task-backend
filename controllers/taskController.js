const Task = require("../models/Task");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.taskCreate = async (req, res) => {
    // Revisar si hay errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // extraer los datos del request
    const { title, start, finish, status } = req.body;

    try {
        // Crear la tarea
        const task = new Task(req.body);

        task.save();

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}