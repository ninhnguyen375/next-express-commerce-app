const express = require('express');
const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/:id', controller.index);
router.post('/postAddtocart', controller.postAddToCart);

module.exports = router;
