const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.api.controller');

router.get('/', controller.getCarts);
router.post('/', controller.addCart);
router.delete('/:id', controller.deleteCart);

module.exports = router;
