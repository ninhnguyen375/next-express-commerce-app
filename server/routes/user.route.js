const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/login', controller.login);
router.get('/signup', controller.signup);
router.post('/signup', controller.postSignup);
router.post('/login', controller.postLogin);
router.get('/:id', controller.index);

module.exports = router;
