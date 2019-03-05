const express = require('express');
const controller = require('../controllers/home.controller');

const router = express.Router();
router.get('/', controller.index);
router.get('/getCategory', controller.getCategory);
router.get('/getAll', controller.getAll);

module.exports = router;
