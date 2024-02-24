// middleware/classValidation.js
const { body } = require("express-validator");

exports.insertClass = [
    body("_id").isInt().withMessage("ID must be an integer"),
    body("name").isString().withMessage("Name must be a string"),
    body("supervisor").isInt().withMessage("Supervisor ID must be an integer"),
    body("children.*").isInt().withMessage("Children IDs must be integers"),
];


