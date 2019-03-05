const express = require('express');
const controller = require('../controllers/search.controller');

const router = express.Router();

router.get('/', controller.index);
router.post('/getSearch', controller.getSearch);
module.exports = router;
