/* eslint-disable */
const Products = require('../models/products.model');
const Producers = require('../models/producers.model');
const Bills = require('../models/bills.model');
const Users = require('../models/user.model');

module.exports.index = async (req, res) => {
  const products = await Products.find();
  const producers = await Producers.find();
  const { authId } = req.params;
  const user = await Users.findById(authId);
  let bills = await Bills.find();
  bills = bills.filter(b => b.authId === authId);
  if (!user) {
    res.redirect('/');
  }
  res.render('bill/index', {
    producers,
    products,
    bills,
    user,
    authId,
  });
};

module.exports.deleteBill = async (req, res) => {
  const { billId, userId, fromAdminPage } = req.body;
  let { proId, proQuantity } = req.body;
  proId = JSON.parse(proId);
  proQuantity = JSON.parse(proQuantity);

  let data = [];
  for (let i = 0; i < proId.length; i++) {
    const obj = {
      proId: proId[i],
      proQuan: proQuantity[i],
    };
    data.push(obj);
  }
  data.forEach(async d => {
    const currPro = await Products.find({ product_id: d.proId });
    const newQuan = currPro[0].quantity + d.proQuan;
    await Products.findOneAndUpdate({ product_id: d.proId }, { quantity: newQuan });
  });
  await Bills.findByIdAndDelete(billId);
  if (fromAdminPage) {
    res.redirect('/admin/bill?page=1&idIsDeleted=' + billId);
  } else {
    res.redirect(`/bill/${userId}`);
  }
};
