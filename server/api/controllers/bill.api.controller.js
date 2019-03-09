const Bills = require('../../models/bills.model');
const Carts = require('../../models/cart.model');
const Products = require('../../models/products.model');

module.exports.index = async (req, res) => {
  const bills = await Bills.find();
  const datas = {
    data: bills
  };
  res.json(datas);
};

module.exports.deleteBill = async (req, res) => {
  if (req.params.id) {
    try {
      await Bills.findByIdAndDelete(req.params.id);
      res.send('Success');
    } catch (err) {
      res.send({ err: err.message });
    }
  } else {
    res.send({
      err: 'Invalid id'
    });
  }
};

module.exports.editBill = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    res.send({ err: 'Does not have any form' });
  } else if (id) {
    const bill = await Bills.findById(id);
    if (!bill) {
      res.send({ err: 'Does not have this bill' });
    } else {
      try {
        await Bills.findByIdAndUpdate(id, { status: req.body.status });
        res.send('Success');
      } catch (err) {
        res.send({ err: err.message });
      }
    }
  } else {
    res.send({ err: 'Invalid id' });
  }
};

module.exports.addBill = async (req, res) => {
  const theBill = req.body;
  await Bills.insertMany(theBill);
  await Carts.deleteMany({ userId: theBill.authId });
  let pro = [];
  for (let i = 0; i < theBill.details.proId.length; i += 1) {
    const proId = theBill.details.proId[i];
    const proQua = theBill.details.proQuantity[i];
    const obj = { proId, proQua };
    pro.push(obj);
  }
  pro.forEach(async p => {
    // find() return an array
    const curr = await Products.find({ product_id: p.proId });
    const newQua = curr[0].quantity - p.proQua;
    await Products.findOneAndUpdate(
      { product_id: p.proId },
      { quantity: newQua }
    );
  });
  res.send('success');
};
