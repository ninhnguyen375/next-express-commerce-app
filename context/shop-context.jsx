import React from 'react';

const ShopContext = React.createContext({
  auth: {},
  checkLogin: () => {}
});

export default ShopContext;
