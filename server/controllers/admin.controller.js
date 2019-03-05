const Products = require('../models/products.model');
const Producers = require('../models/producers.model');
const Users = require('../models/user.model');
const Bills = require('../models/bills.model');


module.exports.index = async (req, res) => {
  const products = await Products.find();
  const producers = await Producers.find();
  const users = await Users.find();
  const bills = await Bills.find();
  res.render('admin/index', {
    producers,
    products,
    users,
    bills,
  });
};
// -----------------------------> Bill
// index
module.exports.bill = async (req, res) => {
  const bills = await Bills.find();
  const users = await Users.find();
  const products = await Products.find();
  const {
    page, idIsDeleted, idIsEdited, added, error,
  } = req.query;
  res.render('admin/bill', {
    bills,
    products,
    users,
    page,
    idIsDeleted,
    idIsEdited,
    added,
    error,
  });
};
// delete
module.exports.deleteBill = async (req, res) => {
  const idToDelete = req.body.id;
  const billIsDeleted = await Bills.findById(idToDelete);
  if (!billIsDeleted) {
    res.redirect('/admin/bill?page=1');
  } else {
    const idIsDeleted = billIsDeleted.id;
    await Bills.findByIdAndDelete(idToDelete);
    res.redirect(`/admin/bill?page=1&idIsDeleted=${idIsDeleted}`);
  }
};
// delete many
module.exports.deleteManyBill = async (req, res) => {
  const { idToDeletes } = req.body;
  const ids = idToDeletes.split(',');
  const lenghtIds = ids.length;
  // ids.forEach(async (id) => {
  //   await Bills.findByIdAndDelete(id);
  // });
  res.redirect(
    `/admin/bill?page=1&error=There+Are+${lenghtIds}+Bills+Have+Been+Deleted!
    Delete Many - Tạm thời chặn . Sợ mất hết dữ liệu thôi :))`,
  );
};
// edit
module.exports.editBill = async (req, res) => {
  const idToEdit = req.body.id;
  const editData = req.body;
  const billIsEdited = await Bills.findById(idToEdit);
  const idIsEdited = billIsEdited.id;
  await Bills.findByIdAndUpdate(idToEdit, {
    status: editData.status,
  });
  res.redirect(`/admin/bill?page=1&idIsEdited=${idIsEdited}`);
};
// add
module.exports.addBill = async (req, res) => {
  // check doublicate
  const producer = await Producers.find({ producer_id: req.body.producer_id });
  if (producer[0]) {
    res.redirect(`/admin/category?page=1&error=id-${req.body.producer_id}-Has-Been-Used!`);
  } else {
    await Producers.insertMany(req.body);
    res.redirect('/admin/category?page=1&added=1');
  }
};

// -----------------------------> Category
// index
module.exports.category = async (req, res) => {
  const producers = await Producers.find();
  const {
    page, idIsDeleted, idIsEdited, added, error,
  } = req.query;
  res.render('admin/category', {
    producers,
    page,
    idIsDeleted,
    idIsEdited,
    added,
    error,
  });
};
// delete
module.exports.deleteProducer = async (req, res) => {
  const idToDelete = req.body.id;
  const producerIsDeleted = await Producers.findById(idToDelete);
  if (!producerIsDeleted) {
    res.redirect('/admin/category?page=1');
  } else {
    const idIsDeleted = producerIsDeleted.id;
    await Producers.findByIdAndDelete(idToDelete);
    res.redirect(`/admin/category?page=1&idIsDeleted=${idIsDeleted}`);
  }
};
// delete many
module.exports.deleteManyCategory = async (req, res) => {
  const { idToDeletes } = req.body;
  const ids = idToDeletes.split(',');
  const lenghtIds = ids.length;
  // ids.forEach(async (id) => {
  //   await Producers.findByIdAndDelete(id);
  // });
  res.redirect(`/admin/category?page=1&error=There+Are+${lenghtIds}+Category+Have+Been+Deleted!
    Delete Many - Tạm thời chặn . Sợ mất hết dữ liệu thôi :))`);
};
// edit
module.exports.editProducer = async (req, res) => {
  const idToEdit = req.body.id;
  const editData = req.body;
  const producerIsEdited = await Producers.findById(idToEdit);
  const idIsEdited = producerIsEdited.id;
  await Producers.findByIdAndUpdate(idToEdit, {
    producer_name: editData.producer_name,
  });
  res.redirect(`/admin/category?page=1&idIsEdited=${idIsEdited}`);
};
// add
module.exports.addProducer = async (req, res) => {
  // check doublicate
  const producer = await Producers.find({ producer_id: req.body.producer_id });
  if (producer[0]) {
    res.redirect(`/admin/category?page=1&error=id-${req.body.producer_id}-Has-Been-Used!`);
  } else {
    await Producers.insertMany(req.body);
    res.redirect('/admin/category?page=1&added=1');
  }
};

// ------------------------> Product
// index
module.exports.product = async (req, res) => {
  const products = await Products.find().sort({ product_id: 1 });
  const producers = await Producers.find();
  const {
    page, idIsDeleted, idIsEdited, added, error, note,
  } = req.query;
  res.render('admin/product', {
    products,
    producers,
    page,
    idIsDeleted,
    idIsEdited,
    added,
    error,
    note,
  });
};
// delete
module.exports.deleteProduct = async (req, res) => {
  const idToDelete = req.body.id;
  const productIsDeleted = await Products.findById(idToDelete);
  if (!productIsDeleted) {
    res.redirect('/admin/product?page=1');
  } else {
    const idIsDeleted = productIsDeleted.product_id;
    await Products.findByIdAndDelete(idToDelete);
    res.redirect(`/admin/product?page=1&idIsDeleted=${idIsDeleted}`);
  }
};
// delete many
module.exports.deleteManyProduct = async (req, res) => {
  const { idToDeletes } = req.body;
  const ids = idToDeletes.split(',');
  const lenghtIds = ids.length;
  // ids.forEach(async (id) => {
  //   await Products.findByIdAndDelete(id);
  // });
  res.redirect(`/admin/product?page=1&error=There+Are+${lenghtIds}+Products+Have+Been+Deleted!
    Delete Many - Tạm thời chặn . Sợ mất hết dữ liệu thôi :))`);
};
// edit
module.exports.editProduct = async (req, res) => {
  const idToEdit = req.body.id;
  const editData = req.body;
  const productIsEdited = await Products.findById(idToEdit);
  const idIsEdited = productIsEdited.id;
  if (req.file) {
    const imgPath = req.file.path;
    await Products.findByIdAndUpdate(idToEdit, {
      product_img: `/${imgPath}`,
      product_name: editData.product_name,
      producer: editData.producer,
      product_price: editData.product_price,
      quantity: editData.quantity,
    });
  } else {
    await Products.findByIdAndUpdate(idToEdit, {
      product_name: editData.product_name,
      producer: editData.producer,
      product_price: editData.product_price,
      quantity: editData.quantity,
    });
  }
  res.redirect(`/admin/product?page=1&idIsEdited=${idIsEdited}`);
};
// add
module.exports.addProduct = async (req, res) => {
  await Products.insertMany({
    product_img: `/${req.file.path}`,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    producer: req.body.producer,
    product_price: req.body.product_price,
    quantity: req.body.quantity,
  });
  res.redirect(`/admin/product?page=1&added=1&note=${req.body.product_name}`);
};

// ------------------------------> User
// index
module.exports.user = async (req, res) => {
  const users = await Users.find();
  const {
    page, idIsDeleted, idIsEdited, added, error,
  } = req.query;
  res.render('admin/user', {
    users,
    page,
    idIsDeleted,
    idIsEdited,
    added,
    error,
  });
};
// delete
module.exports.deleteUser = async (req, res) => {
  const idToDelete = req.body.id;
  const userIsDeleted = await Users.findById(idToDelete);
  if (!userIsDeleted) {
    res.redirect('/admin/user?page=1');
  } else {
    const idIsDeleted = userIsDeleted.id;
    await Users.findByIdAndDelete(idToDelete);
    res.redirect(`/admin/user?page=1&idIsDeleted=${idIsDeleted}`);
  }
};
// delete many
module.exports.deleteManyUser = async (req, res) => {
  const { idToDeletes } = req.body;
  const ids = idToDeletes.split(',');
  const lenghtIds = ids.length;
  // ids.forEach(async (id) => {
  //   await Users.findByIdAndDelete(id);
  // });
  res.redirect(`/admin/user?page=1&error=There+Are+${lenghtIds}+Users+Have+Been+Deleted!
    Delete Many - Tạm thời chặn . Sợ mất hết dữ liệu thôi :))`);
};
// edit
module.exports.editUser = async (req, res) => {
  const idToEdit = req.body.id;
  const editData = req.body;
  const idIsEdited = idToEdit;
  if (editData.admin_password) {
    const admin = await Users.findById(idToEdit);
    if (admin.user_password === editData.admin_password) {
      await Users.findByIdAndUpdate(idToEdit, {
        user_name: editData.user_name,
        user_email: editData.user_email,
        user_phone: editData.user_phone,
        user_permission: editData.user_permission,
      });
      res.redirect(`/admin/user?page=1&idIsEdited=${idIsEdited}`);
    } else {
      res.redirect('/admin/user?page=1&error=WrongAdminPassword');
    }
  } else {
    await Users.findByIdAndUpdate(idToEdit, {
      user_name: editData.user_name,
      user_email: editData.user_email,
      user_phone: editData.user_phone,
      user_permission: editData.user_permission,
      user_password: editData.user_password,
    });
    res.redirect(`/admin/user?page=1&idIsEdited=${idIsEdited}`);
  }
};
// add
module.exports.addUser = async (req, res) => {
  await Users.insertMany(req.body);
  res.redirect('/admin/user?page=1&added=1');
};
