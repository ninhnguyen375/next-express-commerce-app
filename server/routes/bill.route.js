const express = require('express');
const controller = require('../controllers/bill.controller');

const router = express.Router();

router.get('/:authId', controller.index);
router.post('/deleteBill', controller.deleteBill);

module.exports = router;
