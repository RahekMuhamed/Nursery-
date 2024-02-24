const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require("dotenv").config();
const { notFoundHandler, errorHandler } = require('./middlewares');
const authenticateRoute = require("./routes/authenticateRoute");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize Express app
const server = express();

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'School API Documentation',
      version: '1.0.0',
      description: 'Documentation for School API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Listen to port
// const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware to log request URL and method
server.use(morgan('dev'));
// Routes
server.use(authenticateRoute);
server.use('/teachers', require('./routes/teacherRoute'));
server.use('/children', require('./routes/childRoute'));
server.use('/classes', require('./routes/classRoute'));
// Middleware for not found URLs
server.use(notFoundHandler);

// Error handling middleware
server.use(errorHandler);

mongoose
  .connect('mongodb://127.0.0.1:27017/schoolDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));











