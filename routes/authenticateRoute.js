const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticateController'); // Import authenticateController

router.post("/login", authenticateController.login);

module.exports = router;
