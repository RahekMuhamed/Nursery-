// teacherValidation.js
const { body } = require("express-validator");

exports.insertTeacher = [
    body("objectID").isInt().withMessage("Object ID must be an integer"),
    body("fullname").isString().withMessage("Full name must be a string"),
    body("password").isString().withMessage("Password must be a string"),
    body("email").isEmail().withMessage("Invalid email"),
    body("image").isString().withMessage("Image must be a string"),
];


