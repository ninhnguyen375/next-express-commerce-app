const express = require('express');
const multer = require('multer');
const controller = require('../controllers/admin.controller');

const router = express.Router();


// config upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.trim());
  },
});
const upload = multer({ storage });

router.get('/dashboard', controller.index);
router.get('/bill', controller.bill);
router.get('/category', controller.category);
router.get('/product', controller.product);
router.get('/user', controller.user);

router.post('/product/delete', controller.deleteProduct);
router.post('/product/deleteManyProduct', controller.deleteManyProduct);
router.post('/product/edit', upload.single('product_img'), controller.editProduct);
router.post('/product/add', upload.single('product_img'), controller.addProduct);

router.post('/user/delete', controller.deleteUser);
router.post('/user/deleteManyUser', controller.deleteManyUser);
router.post('/user/edit', controller.editUser);
router.post('/user/add', controller.addUser);

router.post('/category/delete', controller.deleteProducer);
router.post('/category/deleteManyCategory', controller.deleteManyCategory);
router.post('/category/edit', controller.editProducer);
router.post('/category/add', controller.addProducer);

router.post('/bill/delete', controller.deleteBill);
router.post('/bill/deleteManyBill', controller.deleteManyBill);
router.post('/bill/edit', controller.editBill);
router.post('/bill/add', controller.addBill);
module.exports = router;
