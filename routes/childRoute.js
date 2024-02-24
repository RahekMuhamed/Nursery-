const express = require('express');
const multer = require('multer');
const path = require('path');
const childController = require('./../controllers/childController');
const router = express.Router();
const { insertChild } = require('../middlewares/childValidation');
const validateChild = require('../middlewares/validation/validator');
const { isAdmin } = require('../middlewares/authenticationMiddleware');
const { isChild } = require('../middlewares/authenticationMiddleware');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage: storage });

// Routes for handling children
router.route('/')
    .all(isAdmin)
    .get(childController.getAllChildren) // isAdmin middleware used to check admin status
    .post(upload.single('image'), insertChild, validateChild, childController.insertChild);

router.route('/:id')
    .get(isAdmin, childController.getChildById)
    .put(isChild, upload.single('image'), insertChild, validateChild, childController.updateChild)
    .delete(childController.deleteChild);

module.exports = router;
