const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: String,
  quantity: Number,
  proId: Number,
  proPrice: Number,
});
const Cart = mongoose.model('Cart', cartSchema, 'Cart');
module.exports = Cart;
