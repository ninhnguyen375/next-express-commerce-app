const express = require('express');
const controller = require('../controllers/bill.api.controller');

const router = express.Router();

router.get('/', controller.index);
router.delete('/:id', controller.deleteBill);
router.put('/:id', controller.editBill);

module.exports = router;
