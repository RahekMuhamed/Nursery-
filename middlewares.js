
const morgan = require('morgan');

const requestLogger = morgan('dev');

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ message: "Not Found" });
};

const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.toString() });
};

module.exports = { requestLogger, notFoundHandler, errorHandler };


