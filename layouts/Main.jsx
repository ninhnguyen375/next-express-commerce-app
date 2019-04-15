import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import Axios from 'axios';
import Router from 'next/router';
import GlobalState from '../context/GlobalState';
import { MainStyles } from './main.styles';
import { ToVietnamese } from '../translate/ToVietnamese';
import Navbar from '../components/Navbar/Navbar';

class Main extends Component {
  state = {
    auth: {}
  };

  handleLogout = () => {
    window.sessionStorage.removeItem('auth');
    Router.push('/signin');
  };

  checkLogin = async () => {
    let newAuth = {};

    // get auth from session
    const auth = JSON.parse(window.sessionStorage.getItem('auth'));

    if (auth) {
      // check auth with database
      const user = await Axios.get('/api/users/' + auth.auth_key);
      if (!user.err) {
        newAuth = {
          auth_name: user.data.user.user_name,
          auth_key: user.data.user._id,
          auth_group: user.data.user.user_group
        };
      }
    }

    // update login status
    if (this.state.auth.auth_key !== newAuth.auth_key) {
      this.setState({ auth: newAuth });
    }
  };

  componentDidUpdate() {
    this.checkLogin();
  }

  componentDidMount() {
    const navbar = document.querySelector('.NavBar');
    let slider = null;

    this.checkLogin();

    const { route } = Router;

    if (route === '/') {
      slider = document.querySelector('.slider');
      navbar.classList.add('bg-transparent');
      navbar.style.position = 'fixed';

      window.onscroll = () => {
        if (window.scrollY > slider.clientHeight - navbar.clientHeight) {
          navbar.classList.remove('bg-transparent');
        } else {
          navbar.classList.add('bg-transparent');
        }
      };
    } else {
      navbar.classList.remove('bg-transparent');
      navbar.style.position = 'sticky';
    }
  }

  render() {
    return (
      <GlobalState auth={this.state.auth} checkLogin={this.checkLogin}>
        {/* Global CSS */}
        {MainStyles}

        {/* Navigation Bar */}
        <Navbar auth={this.state.auth} onLogout={this.handleLogout} />

        {/* Content here */}
        <div className="full-height">{this.props.children}</div>

        {/* Footer */}
        <Footer />
        {/* <ToVietnamese /> */}
      </GlobalState>
    );
  }
}

export default Main;
