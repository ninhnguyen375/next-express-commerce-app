const Products = require('../models/products.model');
const Producers = require('../models/producers.model');

module.exports.getCategory = async (req, res) => {
  const querys = req.query;
  const producers = await Producers.find();
  let products = [];
  products = await Products.find({ producer: querys.producer });
  res.render('home/getCategory', { products, producers, querys });
};
module.exports.getAll = async (req, res) => {
  const querys = req.query;
  const producers = await Producers.find();
  let products = [];
  products = await Products.find();
  res.render('home/getAll', { products, producers, querys });
};
module.exports.index = async (req, res) => {
  const querys = req.query;
  const producers = await Producers.find();
  let products = [];
  if (querys.producer) {
    products = await Products.find({ producer: querys.producer });
    const producer = await Producers.find({ producer_id: querys.producer });
    return res.render('home/category', {
      products,
      producers,
      querys,
      producer,
    });
  }
  if (querys.producer === '') {
    products = await Products.find();
    return res.render('home/allProducts', { products, producers, querys });
  }
  if (!querys.producer) {
    products = await Products.find();
    return res.render('home/index', {
      products,
      producers,
      querys,
    });
  }
};
