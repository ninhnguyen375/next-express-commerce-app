const express = require('express');
const controller = require('../controllers/producer.api.controller');

const router = express.Router();

router.get('/', controller.index);

router.delete('/:id', controller.deleteProducer);
router.post('/', controller.addProducer);
router.put('/:id', controller.editProducer);

module.exports = router;
