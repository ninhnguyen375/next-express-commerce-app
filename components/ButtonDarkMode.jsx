import React, { Component } from 'react';
import shopContext from '../context/shop-context';

class ButtonDarkMode extends Component {
  static contextType = shopContext;

  render() {
    const { isDarkMode, toggleDarkMode } = this.context;
    return (
      <button
        onClick={toggleDarkMode}
        className={`toggle-darkmode ${!isDarkMode ? 'dark' : 'light'}`}
      >
        {!isDarkMode ? 'Dark' : 'Light'} Mode
      </button>
    );
  }
}

export default ButtonDarkMode;
