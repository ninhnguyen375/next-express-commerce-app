const express = require('express');
const controller = require('../controllers/user.api.controller');

const router = express.Router();

router.get('/', controller.index);
router.post('/signin', controller.postSignIn);
router.post('/', controller.postSignup);
router.get('/email', controller.getEmail);

router.post('/signinClient', controller.postSignInClient);
router.get('/checkAdmin/:id', controller.checkAdmin);
router.get('/:id', controller.getUser);

router.delete('/:id', controller.deleteUser);
router.get('/:id/adminPermission', controller.getAdminPermission);
router.put('/:id', controller.editUser);

module.exports = router;
