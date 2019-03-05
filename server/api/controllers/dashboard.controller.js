const moment = require('moment');
const Bills = require('../../models/bills.model');
const Producers = require('../../models/producers.model');
const Products = require('../../models/products.model');
const Users = require('../../models/user.model');

module.exports.getDashboard = async (req, res) => {
  try {
    // get data from DB
    const bills = await Bills.find();
    const producers = await Producers.find();
    const products = await Products.find();
    const users = await Users.find();

    // define variants
    const totalProducts = products.length;
    const totalBills = bills.length;
    const totalCategories = producers.length;
    const totalUsers = users.length;
    let totalSoldProducts = 0;

    const soldProducts = [];
    const statistialOfEachType = [];
    let totalRevenue = 0;
    const time = {
      start: req.query.dateStart,
      end: req.query.dateEnd,
    };

    for (let i = 0; i < bills.length; i += 1) {
      const bill = bills[i];
      const dateStart = time.start ? moment(time.start, 'YYYY-MM-DD') : undefined;
      const dateEnd = time.end ? moment(time.end, 'YYYY-MM-DD') : undefined;
      const notGetTime = !time.start && !time.end;

      // check request time
      if (
        moment(bill.createAt, 'YYYY-MM-DD').isBetween(dateStart, dateEnd, null, '[]')
        || notGetTime
      ) {
        // loop all products in this bill
        for (let j = 0; j < bill.details.proId.length; j += 1) {
          const proId = bill.details.proId[j];
          const proQuantity = bill.details.proQuantity[j];
          const proPrice = bill.details.proPrice[j];
          const currentProduct = products.find(product => product.product_id === proId);
          const totalPrice = proQuantity * proPrice;

          if (!soldProducts[0]) {
            // init soldProducts
            soldProducts.push({ details: currentProduct, amount: proQuantity, totalPrice });
          } else {
            // check douplicate
            const douplicateInSoldProducts = soldProducts.findIndex(
              pro => pro.details.product_id === currentProduct.product_id,
            );

            // push this product to sold products. If douplicate, update it
            if (douplicateInSoldProducts !== -1) {
              const index = douplicateInSoldProducts;
              const newAmount = soldProducts[index].amount + proQuantity;
              const newTotalPrice = newAmount * proPrice;
              soldProducts[index] = {
                details: currentProduct,
                amount: newAmount,
                totalPrice: newTotalPrice,
              };
            } else {
              soldProducts.push({ details: currentProduct, amount: proQuantity, totalPrice });
            }
          }
        }
      }
    }

    producers.forEach((producer) => {
      const type = producer.producer_name;

      // get total price of this type
      const totalPrice = soldProducts.reduce((total, curr) => {
        if (curr.details.producer === producer.producer_id) {
          return total + curr.totalPrice;
        }
        return total;
      }, 0);

      // get total amount of this type
      const totalAmount = soldProducts.reduce((total, curr) => {
        if (curr.details.producer === producer.producer_id) {
          return total + curr.amount;
        }
        return total;
      }, 0);

      // push these value to statistialOfEachType
      statistialOfEachType.push({ type, totalPrice, totalAmount });
    });

    // get total revenue
    totalRevenue = statistialOfEachType.reduce((total, curr) => total + curr.totalPrice, 0);
    // get total sold products
    totalSoldProducts = soldProducts.reduce((total, curr) => total + curr.amount, 0);

    // getTopUser
    let topUsers = [];
    users.forEach((user) => {
      const billsOfUser = bills.filter(bill => bill.authId === user.id && bill.status === 'paid');
      if (billsOfUser[0]) {
        const paidMoney = billsOfUser.reduce((total, curr) => total + curr.totalPrice, 0);
        topUsers.push({ user, paidMoney });
      }
    });
    topUsers = topUsers.sort((x1, x2) => x1.paidMoney - x2.paidMoney < 1);

    // server response
    res.json({
      soldProducts,
      statistialOfEachType,
      totalRevenue,
      totalProducts,
      totalBills,
      totalCategories,
      totalUsers,
      totalSoldProducts,
      topUsers,
    });
  } catch (err) {
    res.json(err);
  }
};
