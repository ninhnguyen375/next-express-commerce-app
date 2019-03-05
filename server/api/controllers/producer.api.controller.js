const Producers = require('../../models/producers.model');

module.exports.index = async (req, res) => {
  const producers = await Producers.find();
  const datas = {
    data: producers,
  };
  res.json(datas);
};

module.exports.deleteProducer = async (req, res) => {
  if (req.params.id) {
    try {
      await Producers.findByIdAndDelete(req.params.id);
      res.send('success');
    } catch (err) {
      res.send({ err });
    }
  } else {
    res.send({
      err: 'invalid id',
    });
  }
};

module.exports.addProducer = async (req, res) => {
  const { body } = req;
  const producers = await Producers.find();
  if (!body) {
    res.send({ err: 'Does not have any form' });
  } else {
    const isDuplicate = producers.find(item => item.producer_id === body.producer_id);
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
    res.send({ err: 'Does not have any form' });
  } else if (id) {
    const producer = await Producers.findById(id);
    if (!producer) {
      res.send({ err: 'Does not have this producer' });
    } else {
      const u = req.body;
      producers = producers.filter(item => item.producer_id !== producer.producer_id);
      const validId = producers.find(item => item.producer_id === u.producer_id);
      if (validId) res.send({ err: 'Duplicate ID' });
      else {
        await Producers.findByIdAndUpdate(id, {
          producer_name: u.producer_name,
          producer_id: u.producer_id,
        });
        res.send('Success');
      }
    }
  } else {
    res.send({ err: 'Invalid id' });
  }
};
