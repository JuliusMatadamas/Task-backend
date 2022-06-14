const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");

// CREATE
router.post('/', [
    check('title', 'The title is required.').notEmpty().isString(),
    check('start', 'The start date is required and must be a valid date.').isDate()
], taskController.taskCreate);

// READ

// UPDATE

// DELETE

module.exports = router;