const express = require('express');
const router = express.Router();
const { changePassword } = require('../controllers/passwordController');
const { isAuthenticated } = require('../middlewares/authenticationMiddleware');

// Route for changing password
router.put('/change-password', isAuthenticated, changePassword);

module.exports = router;
