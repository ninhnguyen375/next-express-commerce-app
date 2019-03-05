/* eslint-disable */
const Users = require('../models/user.model');
const Producers = require('../models/producers.model');
const Products = require('../models/products.model');

module.exports.index = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  const products = await Products.find();
  const producers = await Producers.find();
  if (user) {
    res.render('user/index', {
      user,
      products,
      producers,
    });
  } else {
    res.send(`False to get user ${id}, User are not exist!`);
  }
};

module.exports.signup = async (req, res) => {
  res.render('user/signup');
};

module.exports.login = (req, res) => {
  res.render('user/login');
};

module.exports.postLogin = async (req, res) => {
  const { password, email } = req.body;
  const producers = await Producers.find();
  const user = await Users.findOne({ user_email: email, user_password: password });
  if (user) {
    if (!user.user_status) {
      console.log(user);
      const err = 'Account is Blocked';
      res.render('user/login', {
        err,
        password,
        email,
      });
    } else {
      res.render('user/index', {
        producers,
        user,
      });
    }
  } else {
    const err = 'Account incorrect';
    res.render('user/login', {
      err,
      password,
      email,
    });
  }
};

function validateEmail(email) {
  return email.indexOf('@') !== -1;
}
module.exports.postSignup = async (req, res) => {
  const users = await Users.find();
  const reqUser = req.body;
  const isDuplicatedEmail = false;
  let isEmail = false;
  let foundUser = users.find(user => user.user_email === reqUser.user_email);
  if (foundUser) {
    isDuplicatedEmail = true;
  }
  if (validateEmail(reqUser.user_email)) {
    isEmail = true;
  }
  if (isDuplicatedEmail || !isEmail) {
    res.render('user/signup', { error: 'Fail to sign up, please try again' });
  } else {
    const obj = {
      user_name: reqUser.user_name,
      user_phone: reqUser.user_phone,
      user_email: reqUser.user_email,
      user_password: reqUser.user_password,
      user_group: 'client',
      user_permission: {
        product: false,
        user: false,
        bill: false,
        category: false,
      },
      user_status: true,
    };
    await Users.insertMany(obj);
    res.redirect('/user/login');
  }
};
