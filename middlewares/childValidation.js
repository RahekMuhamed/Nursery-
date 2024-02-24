// middleware/childValidation.js
const { body } = require("express-validator");

exports.insertChild = [
    body("_id").isInt().withMessage("ID must be an integer"),
    body("fullName").isString().withMessage("Full name must be a string"),
    body("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),
    body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("Invalid level"),
    body("address.city").isString().withMessage("City must be a string"),
    body("address.street").isString().withMessage("Street must be a string"),
    body("address.building").isInt().withMessage("Building number must be an integer"),
];


