const Carts = require('../../models/cart.model');

module.exports.addCart = async (req, res) => {
  try {
    const cart = await Carts.find({
      userId: req.body.userId,
      proId: req.body.proId
    });
    if (cart[0]) {
      const newQuantity =
        parseInt(cart[0].quantity, 10) + parseInt(req.body.quantity, 10);
      if (newQuantity > 5)
        return res.send({
          err: 'Only 5 products of the same type in your cart!!'
        });
      await Carts.findByIdAndUpdate(cart[0].id, { quantity: newQuantity });
      return res.send('success');
    }
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
