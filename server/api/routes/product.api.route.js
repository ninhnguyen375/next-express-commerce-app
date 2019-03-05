const express = require('express');
const multer = require('multer');
const controller = require('../controllers/product.api.controller');

const router = express.Router();

// config upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', controller.index);
router.get('/:id', controller.getProduct);
router.delete('/:product_id', controller.deleteProduct);
router.post('/', upload.single('product_img'), controller.addProduct);
router.put('/:id', controller.editProduct);
module.exports = router;
