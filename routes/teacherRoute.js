const express = require('express');
const multer = require('multer');
const path = require('path');

const teacherController = require('./../controllers/teacherController');
const router = express.Router();
const { insertTeacher } = require("../middlewares/teacherValidation"); // Correct import
const validateTeacher = require("../middlewares/validation/validator"); // Ensure this middleware exists
const {isAdmin} = require('../middlewares/authenticationMiddleware')

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

// Routes for teachers
router.route('/')
    .all(isAdmin)
    .get(teacherController.getAllTeachers)
    .post(insertTeacher, validateTeacher, teacherController.insertTeacher);

router.route('/:id')
    .get(isAdmin,teacherController.getTeacherById)
    .put(insertTeacher, validateTeacher, teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher);

router.get('/supervisors', teacherController.getAllSupervisors);

module.exports = router;
