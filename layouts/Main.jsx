import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Axios from 'axios';
import Router from 'next/router';
import GlobalState from '../context/GlobalState';
export class Main extends Component {
  state = {
    auth: {}
  };

  handleLogout = () => {
    window.sessionStorage.removeItem('auth');
    // this.forceUpdate();
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
          auth_key: user.data.user._id
        };
      }
    }

    // update login status
    if (this.state.auth.auth_key !== newAuth.auth_key) {
      this.setState({ auth: newAuth });
    }
  };

  async componentDidUpdate() {
    await this.checkLogin();
  }

  async componentDidMount() {
    // window.scrollTo({ top: 0 });
    await this.checkLogin();
  }

  render() {
    return (
      <GlobalState auth={this.state.auth} checkLogin={this.checkLogin}>
        {/* Global CSS */}
        <style jsx global>{`
          * {
            // font-family: Roboto;
            scroll-behavior: smooth;
          }
          .full-height {
            min-height: 80vh;
          }
          .fadeIn {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>

        {/* Navigation Bar */}
        <Navbar auth={this.state.auth} onLogout={this.handleLogout} />

        {/* Content here */}
        <div className="full-height">{this.props.children}</div>

        {/* Footer */}
        <Footer />
      </GlobalState>
    );
  }
}

export default Main;
