import React, { Component } from 'react';
import ShopContext from './shop-context';

export class GlobalState extends Component {
  render() {
    const { auth, checkLogin, isDarkMode, toggleDarkMode } = this.props;

    return (
      <ShopContext.Provider
        value={{ auth, checkLogin, isDarkMode, toggleDarkMode }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export default GlobalState;
