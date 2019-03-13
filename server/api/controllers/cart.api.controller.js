const Carts = require('../../models/cart.model');
const Products = require('../../models/products.model');

module.exports.addCart = async (req, res) => {
  const { proId, userId, quantity } = req.body;

  try {
    const product = await Products.findOne({ product_id: proId });

    const cart = await Carts.findOne({
      userId: userId,
      proId: proId
    });

    if (cart) {
      const newQuantity = cart.quantity + parseInt(quantity, 10);

      if (newQuantity > 5)
        return res.send({
          err: 'Only 5 products of the same type in your cart!!'
        });

      if (product.quantity - newQuantity < 0)
        return res.send({
          err: 'This product is out of stock',
          product_name: product.product_name
        });

      await Carts.findByIdAndUpdate(cart.id, { quantity: newQuantity });
      return res.send('success');
    }

    if (product.quantity - parseInt(quantity, 10) < 0)
      return res.send({
        err: 'This product is out of stock',
        product_name: product.product_name
      });

    await Carts.insertMany(req.body);
    return res.send('success');
  } catch (err) {
    return res.send({ err: err.message });
  }
};

module.exports.getCarts = async (req, res) => {
  try {
    const carts = await Carts.find();
    res.json(carts);
  } catch (err) {
    return res.send({ err: err.message });
  }
};

module.exports.deleteCart = async (req, res) => {
  try {
    await Carts.findByIdAndDelete(req.params.id);
    return res.send('success');
  } catch (err) {
    return res.send({ err: err.message });
  }
};
