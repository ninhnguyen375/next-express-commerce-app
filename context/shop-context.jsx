import React from 'react';

// declare && initial context
const ShopContext = React.createContext({
  auth: {},
  checkLogin: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {}
});

export default ShopContext;
