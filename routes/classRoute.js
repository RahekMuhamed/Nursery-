const express = require('express');
const { body, param, qury } = require("express-validator");
const classController = require('./../controllers/classController');
const router = express.Router();
const { insertClass } = require('../middlewares/classValidation');
const validateClass = require('../middlewares/validation/validator');

router.route('/')
    .get(classController.getAllClasses)
    .post(insertClass, validateClass, classController.insertClass);

router.route('/:id')
    .get(classController.getClassById)
    .put(insertClass, validateClass, classController.updateClass)
    .delete(classController.deleteClass);

router.get('/child/:id', classController.getClassChildren);
router.get('/teacher/:id', classController.getClassSupervisor);

module.exports = router;
