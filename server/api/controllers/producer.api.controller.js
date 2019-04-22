const Producers = require('../../models/producers.model');
const Products = require('../../models/products.model');

module.exports.index = async (req, res) => {
  const producers = await Producers.find();
  const data = {
    data: producers
  };
  res.json(data);
};

module.exports.deleteProducer = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const producer = await Producers.findById(id);
      const product = await Products.findOne({
        producer: producer.producer_id
      });
      if (product) {
        return res.send({
          err: `Can't delete ${
            producer.producer_name
          }, this has a lot of products`
        });
      } else {
        await Producers.findByIdAndDelete(id);
        return res.send('success');
      }
    } catch (err) {
      return res.send({ err });
    }
  } else {
    return res.send({
      err: 'invalid id'
    });
  }
};

module.exports.addProducer = async (req, res) => {
  const { body } = req;
  const producers = await Producers.find();
  if (!body) {
    res.send({ err: 'Not have any form' });
  } else {
    const isDuplicate = producers.find(
      item => item.producer_id === body.producer_id
    );
    if (isDuplicate) res.send({ err: 'Duplicate ID' });
    else {
      try {
        await Producers.insertMany(body);
        res.send('Success');
      } catch (err) {
        res.send({ err: err.message });
      }
    }
  }
};

module.exports.editProducer = async (req, res) => {
  const { id } = req.params;
  let producers = await Producers.find();
  if (!req.body.producer_name) {
    res.send({ err: 'Not have any form' });
  } else if (id) {
    const producer = await Producers.findById(id);
    if (!producer) {
      res.send({ err: 'Not have this producer' });
    } else {
      const u = req.body;
      producers = producers.filter(
        item => item.producer_id !== producer.producer_id
      );
      const validId = producers.find(
        item => item.producer_id === u.producer_id
      );
      if (validId) res.send({ err: 'Duplicate ID' });
      else {
        await Producers.findByIdAndUpdate(id, {
          producer_name: u.producer_name,
          producer_id: u.producer_id
        });
        res.send('Success');
      }
    }
  } else {
    res.send({ err: 'Invalid id' });
  }
};
