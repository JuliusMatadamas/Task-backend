const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// CREATE
router.post('/', auth, [
    check('title', 'The title is required.').not().isEmpty(),
    check('start', 'The start date is required and must be a valid date.').isDate()
], taskController.taskCreate);

// READ
router.get('/', auth, taskController.taskRead);

// UPDATE
router.put('/:id', auth, [
    check('title', 'The title is required.').not().isEmpty(),
    check('start', 'The start date is required and must be a valid date.').isDate()
], taskController.taskUpdate);

// DELETE
router.delete('/:id', auth, taskController.taskDelete);

module.exports = router;