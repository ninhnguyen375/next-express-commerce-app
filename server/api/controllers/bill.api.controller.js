const Bills = require('../../models/bills.model');

module.exports.index = async (req, res) => {
  const bills = await Bills.find();
  const datas = {
    data: bills,
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
      err: 'Invalid id',
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
