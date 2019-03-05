const Products = require('../../models/products.model');
const Producers = require('../../models/producers.model');

// index
module.exports.index = async (req, res) => {
  const products = await Products.find();
  const datas = {
    data: products,
  };
  res.json(datas);
};

// get product
module.exports.getProduct = async (req, res) => {
  if (!req.params.id) {
    res.send({ err: 'invalid ID' });
  } else {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) res.send({ err: 'This product does not exist' });
      else {
        const producer = await Producers.find({ producer_id: product.producer });
        if (!producer[0]) res.send({ err: 'producer does not exist' });
        else {
          res.send({ product, producer: producer[0] });
        }
      }
    } catch (err) {
      res.send({ err: 'This product does not exist' });
    }
  }
};

// add new product
module.exports.addProduct = async (req, res) => {
  if (req.file) {
    res.send({ added: true, message: 'added image' });
  } else {
    const products = await Products.find();
    const newId = parseInt(products[products.length - 1].product_id, 10) + 1;
    const imgPath = req.body.product_img_path.trim();
    try {
      await Products.insertMany({
        product_img: `/uploads/${imgPath}`,
        product_id: newId,
        product_name: req.body.product_name,
        producer: req.body.producer,
        product_price: req.body.product_price,
        quantity: req.body.quantity,
      });
      res.send({ added: true });
    } catch (err) {
      res.send({ added: false, err });
    }
  }
};

module.exports.deleteProduct = async (req, res) => {
  if (req.params) {
    await Products.findOneAndDelete({ product_id: req.params.product_id });
    res.send(req.params.product_id);
  } else {
    res.send('invalid id');
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    if (req.body.product_img_path) {
      const imgPath = req.body.product_img_path.trim();
      await Products.findByIdAndUpdate(req.params.id, {
        product_img: `/uploads/${imgPath}`,
        product_name: req.body.product_name,
        producer: req.body.producer,
        product_price: req.body.product_price,
        quantity: req.body.quantity,
      });
      res.send('edit success');
    } else {
      await Products.findByIdAndUpdate(req.params.id, {
        product_name: req.body.product_name,
        producer: req.body.producer,
        product_price: req.body.product_price,
        quantity: req.body.quantity,
      });
      res.send('edit success');
    }
  } catch (err) {
    res.send({ err });
  }
};
