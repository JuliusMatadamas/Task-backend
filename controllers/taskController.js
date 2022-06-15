const Task = require("../models/Task");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Crear tarea
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

        // Guardar el owner de la tarea
        task.owner = req.user.id;

        // Se guarda la tarea
        task.save();

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}

// Leer tareas
exports.taskRead = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user.id, deleted_at: null }).sort({ start: -1 });
        res.json({tasks});
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}

// Actualizar una tarea
exports.taskUpdate = async (req, res) => {
    // Revisar si hay errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { title, start, finish, status } = req.body;
    const newTask = {};

    if (title) {
        newTask.title = title;
    }

    if (start) {
        newTask.start = start;
    }

    if (finish) {
        newTask.finish = finish;
    }

    if (status) {
        newTask.status = status;
    }

    newTask.updated_at = Date.now();

    try {
        // Revisar el id de la tarea
        let task = await Task.findById(req.params.id);

        // Verificar que exista la tarea
        if (!task) {
            res.status(404).json({msg: 'Task not found.'});
        }

        // Verificar que la tarea le pertenezca al usuario
        if (task.owner.toString() !== req.user.id ) {
            res.status(401).json({msg: 'Not authorized.'});
        }

        // Actualizar
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, { $set: newTask }, { new: true});

        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}

// Eliminar una tarea
exports.taskDelete = async (req, res) => {
    const newTask = {};

    newTask.deleted_at = Date.now();
    newTask.updated_at = Date.now();

    try {
        // Revisar el id de la tarea
        let task = await Task.findById(req.params.id);

        // Verificar que exista la tarea
        if (!task) {
            res.status(404).json({msg: 'Task not found.'});
        }

        // Verificar que la tarea le pertenezca al usuario
        if (task.owner.toString() !== req.user.id ) {
            res.status(401).json({msg: 'Not authorized.'});
        }

        // Actualizar
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, { $set: newTask }, { new: true});

        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error: ${error}`);
    }
}