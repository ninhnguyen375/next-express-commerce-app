const Users = require('../../models/user.model');
const Products = require('../../models/products.model');
const Cart = require('../../models/cart.model');
const Bills = require('../../models/bills.model');

const moment = require('moment');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const TokensResetPassword = require('../../models/tokenResetPassword.model');

module.exports.index = async (req, res) => {
  const users = await Users.find();
  const data = {
    data: users
  };
  res.json(data);
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
    return res.send({ err: 'Not have enough data' });
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

module.exports.createUserByAdmin = async (req, res) => {
  const users = await Users.find();
  const reqUser = req.body;
  if (
    !reqUser ||
    !reqUser.user_name ||
    !reqUser.user_phone ||
    !reqUser.user_email ||
    !reqUser.user_password
  ) {
    return res.send({ err: 'Not have enough data' });
  }
  const isDuplicatedEmail = users.find(
    user => user.user_email === reqUser.user_email
  );

  if (isDuplicatedEmail) {
    return res.send({ err: 'This email has been used' });
  }

  try {
    const obj = {
      user_email: reqUser.user_email,
      user_name: reqUser.user_name,
      user_phone: reqUser.user_phone,
      user_password: reqUser.user_password,
      user_status: reqUser.user_status || true,
      user_group: reqUser.user_group || 'client',
      user_permission: reqUser.user_permission || {
        product: false,
        bill: false,
        user: false,
        category: false
      }
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
    res.send({ err: 'Not have enough data' });
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
    res.send({ err: 'Not have any form' });
  } else if (id) {
    const user = await Users.findById(id);
    if (!user) {
      res.send({ err: 'Not have this user' });
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
  try {
    const user = await Users.findById(req.params.id);
    if (!user || user.user_group !== 'admin') {
      return res.status(401).send({ err: 'Permission denied' });
    } else {
      return res.send({ admin: user.user_permission });
    }
  } catch (err) {
    return res.status(401).send({ err: 'Permission denied' });
  }
};

module.exports.getCartsOfUser = async (req, res) => {
  let makeupCarts;
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
  let makeupBills;
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

module.exports.findUserByEmail = async (req, res) => {
  if (!req.query || !req.query.user_email)
    return res.send({
      err: 'Not have any query',
      found: false
    });
  try {
    const user = await Users.findOne({ user_email: req.query.user_email });
    if (!user)
      return res.send({ err: 'No user have this email', found: false });
    res.send({ found: true, user });
  } catch (err) {
    res.send({ found: false, err: err.message });
  }
};

module.exports.editPassword = async (req, res) => {
  const { currPassword, newPassword } = req.body;
  const { id } = req.params;
  const user = await Users.findById(id);
  if (user) {
    if (user.user_password === currPassword) {
      await Users.findByIdAndUpdate(id, { user_password: newPassword });
      return res.send('success');
    } else {
      return res.send({ err: 'incorrect password' });
    }
  } else {
    return res.send({ err: 'Not have this user' });
  }
};

module.exports.renderResetPassword = async (req, res) => {
  const { token } = req.params;
  if (!token) return res.send({ err: 'invalid token' });

  const reset = await TokensResetPassword.findOne({ token: token });

  if (!reset) return res.send({ err: 'invalid token' });
  const now = moment();
  const expired = moment(reset.expired);
  if (now.isBefore(expired)) {
    res.send({ token: token });
  } else {
    return res.send({ err: 'Expired' });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  if (!newPassword || !token) {
    return res.send('invalid new password or token');
  }

  const reset = await TokensResetPassword.findOne({ token: token });
  if (!reset) return res.send({ err: 'invalid token' });
  const now = moment();
  const expired = moment(reset.expired);
  if (!now.isBefore(expired)) {
    return res.send({ err: 'Expired' });
  }
  const user = await Users.findById(reset.user);
  if (!user) return res.send({ err: 'user does not exist' });

  try {
    await Users.findByIdAndUpdate(reset.user, { user_password: newPassword });
    await TokensResetPassword.findByIdAndUpdate(reset._id, {
      expired: moment()
    });
    return res.send('success');
  } catch (err) {
    return res.send({ err: err.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  const { user_email } = req.body;

  if (!user_email) return res.send({ err: 'null' });

  const user = await Users.findOne({ user_email: user_email });

  if (!user) return res.send({ err: 'This email is not used by any user' });

  let token = await bcrypt.hash(user.user_email, 5);
  token = token.replace(/\//g, '');

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ninhnguyen375@gmail.com',
      pass: `console.log('Hello World');`
    }
  });
  const mailOptions = {
    from: 'Shopphone',
    to: user_email,
    subject: 'SHOPPHONE, Reset Your Password',
    html: `<a
        href="${req.headers.origin.split('://')[0]}://${
      req.headers.host
    }/resetPassword?token=${token}"
      >
        Reset Your Password
      </a>
      The Link will expire in 1 hour
    `
  };
  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) return res.send({ err: err.message });
    else {
      await TokensResetPassword.insertMany({
        token: token,
        expired: moment() + 3600000,
        user: user._id
      });
      return res.send({ info });
    }
  });
};

module.exports.getUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};
