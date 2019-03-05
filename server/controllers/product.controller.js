const Products = require('../models/products.model');
const Producers = require('../models/producers.model');
const Cart = require('../models/cart.model');

module.exports.index = async (req, res) => {
  const proId = req.params.id;
  const product = await Products.findById(proId);
  const producers = await Producers.find();
  res.render('product/index', {
    product,
    producers,
  });
};

module.exports.postAddToCart = async (req, res) => {
  const reqBody = await req.body;
  const cart = await Cart.find({ proId: reqBody.proId, userId: reqBody.userId });
  if (cart[0]) {
    const newQua = parseInt(reqBody.quantity, 10) + cart[0].quantity;
    await Cart.findOneAndUpdate({ proId: reqBody.proId }, { quantity: newQua });
  } else {
    await Cart.insertMany(reqBody);
  }
  res.redirect(`/cart/${reqBody.userId}`);
};
