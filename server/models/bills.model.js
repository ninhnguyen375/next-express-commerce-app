const mongoose = require('mongoose');

const billShema = new mongoose.Schema({
  authId: String,
  createAt: String,
  totalPrice: Number,
  status: String,
  details: {
    proId: [Number],
    proPrice: [Number],
    proQuantity: [Number],
  },
});
const Bills = mongoose.model('Bills', billShema, 'Bills');
module.exports = Bills;
