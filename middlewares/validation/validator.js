const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length >= 1) {
        let errorMessages = result.errors.reduce(
            (current, error) => current + error.msg + ""
        );
        let error = new Error(errorMessages);
        error.statusCode = 422;
        next(error);
    } else {
        next();
    }
};
