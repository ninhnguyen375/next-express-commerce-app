const Users = require('../../models/user.model');
const Products = require('../../models/products.model');
const Cart = require('../../models/cart.model');
const Bills = require('../../models/bills.model');

module.exports.index = async (req, res) => {
  const users = await Users.find();
  const datas = {
    data: users
  };
  res.json(datas);
};


module.exports.postSignUp = async (req, res) => {
  const users = await Users.find();
  const reqUser = req.body;
  if (
    !reqUser ||
    !reqUser.user_name ||
    !reqUser.user_phone ||
    !reqUser.user_email ||
    !reqUser.user_password
  ) {
    return res.send({ err: 'Does not have enough data' });
  }
  const isDuplicatedEmail = users.find(
    user => user.user_email === reqUser.user_email
  );

  if (isDuplicatedEmail) {
    return res.send({ err: 'This email has been used' });
  }
  try {
    const obj = {
      user_name: reqUser.user_name,
      user_password: reqUser.user_password,
      user_phone: reqUser.user_phone,
      user_status: true,
      user_permission: {
        user: false,
        product: false,
        bill: false,
        category: false
      },
      user_group: 'client',
      user_email: reqUser.user_email
    };
    await Users.insertMany(obj);
    res.send('success');
  } catch (err) {
    res.send({ err: err.message });
  }
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.send({ err: 'User Does Not Exist' });
    } else {
      return res.send({ user });
    }
  } catch (err) {
    return res.send({ err: err.message });
  }
};

module.exports.postSignIn = async (req, res) => {
  if (!req.body || !req.body.user_email || !req.body.user_password) {
    res.send({ err: 'Does not have enough data' });
  } else {
    try {
      const user = await Users.findOne({
        user_email: req.body.user_email,
        user_password: req.body.user_password
      });
      if (!user) {
        res.send({ err: 'Account Does Not Exist' });
      } else if (user.user_group !== 'admin' || !user.user_status) {
        res.send({ err: 'Permission Denied' });
      } else {
        res.send({ adminDetails: user });
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  }
};

module.exports.postSignInClient = async (req, res) => {
  const { user_password, user_email } = req.body;

  const user = await Users.findOne({
    user_email: user_email,
    user_password: user_password
  });
  if (user) {
    if (!user.user_status) {
      const err = 'Account is Blocked';
      res.send({ err });
    } else {
      res.send({ user });
    }
  } else {
    const err = 'Account incorrect';
    res.send({ err });
  }
};
module.exports.getEmail = async (req, res) => {
  const userEmails = await Users.find().select('user_email');
  res.json(userEmails);
};

module.exports.checkAdmin = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user.user_group === 'admin') {
      res.send({ isAdmin: true });
    } else {
      res.send({ err: 'This user Is not admin' });
    }
  } catch (err) {
    res.send({ err: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (req.params.id) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.send('success');
    } catch (err) {
      res.send({ err });
    }
  } else {
    res.send({
      err: 'invalid id'
    });
  }
};

module.exports.editUser = async (req, res) => {
  const { id } = req.params;
  let users = await Users.find();
  if (!req.body.user_name) {
    res.send({ err: 'Does not have any form' });
  } else if (id) {
    const user = await Users.findById(id);
    if (!user) {
      res.send({ err: 'Does not have this user' });
    } else {
      const u = req.body;
      users = users.filter(item => item.user_email !== user.user_email);
      const validEmail = users.find(item => item.user_email === u.user_email);
      if (validEmail) res.send({ err: 'Duplicate email' });
      else {
        await Users.findByIdAndUpdate(id, {
          user_name: u.user_name,
          user_password: u.user_password,
          user_phone: u.user_phone,
          user_group: u.user_group,
          user_email: u.user_email,
          user_permission: u.user_permission,
          user_status: u.user_status
        });
        res.send('Success');
      }
    }
  } else {
    res.send({ err: 'Invalid id' });
  }
};

module.exports.getAdminPermission = async (req, res) => {
  const user = await Users.findById(req.params.id);
  return res.send({ admin: user.user_permission });
};

module.exports.getCartsOfUser = async (req, res) => {
  try {
    const products = await Products.find();
    const cartItems = await Cart.find({ userId: req.params.id });

    makeupCarts = cartItems.map(item => {
      const currPro = products.find(pro => pro.product_id === item.proId);
      return {
        currPro,
        cartItem: item
      };
    });
    return res.send({ makeupCarts });
  } catch (err) {
    return res.send({ err: err.message });
  }
};

module.exports.getBillsOfUser = async (req, res) => {
  try {
    const products = await Products.find();

    const bills = await Bills.find({ authId: req.params.id });

    makeupBills = bills.map(bill => {
      const productsOfBill = [];

      for (let i = 0; i < bill.details.proId.length; i++) {
        const id = bill.details.proId[i];
        const currPrice = bill.details.proPrice[i];
        const currQuantity = bill.details.proQuantity[i];
        let currProduct = products.find(item => item.product_id === id);
        currProduct = {
          ...currProduct,
          product_price: currPrice,
          ...currProduct,
          quantity: currQuantity
        };
        productsOfBill.push(currProduct);
      }

      return {
        productsOfBill,
        bill: bill
      };
    });
    return res.send({ makeupBills });
  } catch (err) {
    return res.send({ err: err.message });
  }
};
