import React from 'react';

// declare && initial context
const ShopContext = React.createContext({
  auth: {},
  checkLogin: () => {}
});

export default ShopContext;
