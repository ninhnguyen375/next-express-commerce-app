const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_img: String,
  product_name: String,
  product_id: Number,
  product_price: Number,
  producer: String,
  quantity: Number,
});
const Products = mongoose.model('Products', productSchema, 'Products');
module.exports = Products;
