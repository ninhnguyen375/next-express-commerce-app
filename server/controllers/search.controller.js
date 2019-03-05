const Producers = require('../models/producers.model');
const Products = require('../models/products.model');

module.exports.index = async (req, res) => {
  const querys = req.query;
  const producers = await Producers.find();
  let products = await Products.find();
  if (querys.search) {
    products = products.filter(
      product => product.product_name
        .toLowerCase()
        .trim()
        .indexOf(querys.search.toLowerCase().trim()) !== -1,
    );
  }
  if (querys.price) {
    const minPrice = parseInt(querys.price.split('to')[0], 10);
    const maxPrice = parseInt(querys.price.split('to')[1], 10);
    products = products.filter((pro) => {
      const price = parseInt(pro.product_price, 10);
      return price <= maxPrice && price >= minPrice;
    });
  }
  if (querys.producer) {
    products = products.filter(pro => pro.producer === querys.producer);
  }
  if (querys.sortByName) {
    if (querys.sortByName === 'AtoZ') {
      products.sort((a, b) => {
        const nameA = a.product_name.toLowerCase();
        const nameB = b.product_name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      products.sort((a, b) => {
        const nameA = a.product_name.toLowerCase();
        const nameB = b.product_name.toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
  }
  if (querys.sortByPrice) {
    products.sort((a, b) => {
      const priceA = parseInt(a.product_price, 10);
      const priceB = parseInt(b.product_price, 10);
      return priceA - priceB;
    });
    if (querys.sortByPrice !== 'Asc') {
      products.reverse();
    }
  }
  res.render('search/index', {
    querys,
    producers,
    products,
  });
};

// getSearch
module.exports.getSearch = async (req, res) => {
  const querys = req.body;
  const producers = await Producers.find();

  let products = await Products.find();
  if (querys.search) {
    products = products.filter(
      product => product.product_name
        .toLowerCase()
        .trim()
        .indexOf(querys.search.toLowerCase().trim()) !== -1,
    );
  }
  if (querys.price) {
    const minPrice = parseInt(querys.price.split('to')[0], 10);
    const maxPrice = parseInt(querys.price.split('to')[1], 10);
    products = products.filter((pro) => {
      const price = parseInt(pro.product_price, 10);
      return price <= maxPrice && price >= minPrice;
    });
  }
  if (querys.producer) {
    products = products.filter(pro => pro.producer === querys.producer);
  }
  if (querys.sortByName) {
    if (querys.sortByName === 'AtoZ') {
      products.sort((a, b) => {
        const nameA = a.product_name.toLowerCase();
        const nameB = b.product_name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      products.sort((a, b) => {
        const nameA = a.product_name.toLowerCase();
        const nameB = b.product_name.toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
  }
  if (querys.sortByPrice) {
    products.sort((a, b) => {
      const priceA = parseInt(a.product_price, 10);
      const priceB = parseInt(b.product_price, 10);
      return priceA - priceB;
    });
    if (querys.sortByPrice !== 'Asc') {
      products.reverse();
    }
  }
  res.render('search/get', {
    querys,
    producers,
    products,
  });
};
