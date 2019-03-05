import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Axios from 'axios';
const hello = React.createContext('world');

export { hello };
export class Main extends Component {
  state = {
    auth: {}
  };

  handleLogout = () => {
    window.sessionStorage.removeItem('auth');
    this.forceUpdate();
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

  componentDidUpdate(prevProps, prevState) {
    this.checkLogin();
  }

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <hello.Provider value="world">
        {/* Global CSS */}
        <style jsx global>{`
          * {
            font-family: Roboto;
          }
        `}</style>

        {/* Navigation Bar */}
        <Navbar auth={this.state.auth} onLogout={this.handleLogout} />

        {/* Content here */}
        {this.props.children}

        {/* Footer */}
        <Footer />
      </hello.Provider>
    );
  }
}

export default Main;
