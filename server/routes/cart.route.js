const express = require('express');
const controller = require('../controllers/cart.controller');

const router = express.Router();

router.get('/:id', controller.index);
router.post('/removeCart', controller.removeCart);
router.post('/addBill', controller.addBill);

module.exports = router;
