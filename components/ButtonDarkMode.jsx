import React, { Component } from 'react';

const isServer = !document;
class ButtonDarkMode extends Component {
  state = {
    isDarkMode: false
  };

  toggleDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  render() {
    const { isDarkMode } = this.state;
    if (!isServer) {
      if (isDarkMode) {
        document.querySelector('body').style.background = '#000';
      } else {
        document.querySelector('body').style.background = '#fff';
      }
    }
    return (
      <button
        onClick={this.toggleDarkMode}
        className={`toggle-darkmode ${!isDarkMode ? 'dark' : 'light'}`}
      >
        {!isDarkMode ? 'Dark' : 'Light'} Mode
      </button>
    );
  }
}

export default ButtonDarkMode;
