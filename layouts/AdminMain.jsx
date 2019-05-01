import React, { Component } from 'react';
import Navbar from '../components/admin/navbar/Navbar';
import Footer from '../components/admin/Footer';
import Sidebar from '../components/admin/sidebar/Sidebar';
import Axios from 'axios';
import AdminStyles from './admin.style';

// setup redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../store/reducer/rootReducer';
import thunk from 'redux-thunk';
import SignInAdmin from '../components/admin/SignInAdmin';
import './styles/AdminStyle.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

class AdminMain extends Component {
  state = {
    isAdmin: false,
    checkAdminError: '',
    adminDetails: '',
    adminPermission: '',
    loading: true
  };

  checkAdmin = async () => {
    const admin = JSON.parse(window.sessionStorage.getItem('adminPageAccess'));

    if (!admin || !admin.admin_key || !admin.admin_name) {
      this.setState({
        ...this.state,
        loading: false
      });
      return;
    }

    const res = await Axios.get(
      `/api/users/${admin.admin_key}/adminPermission`
    );

    if (res.data.err) {
      this.setState({
        ...this.state,
        checkAdminError: res.data.err,
        loading: false
      });
    } else {
      this.setState({
        ...this.state,
        isAdmin: true,
        adminPermission: res.data.admin,
        adminDetails: admin,
        loading: false
      });
    }
  };
  componentWillUnmount() {
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.checkAdmin();
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1 style={{ color: 'gray', textAlign: 'center' }}>Loading</h1>
        ) : (
          <>
            {/* styles jsx */}
            {AdminStyles}

            {this.state.isAdmin ? (
              <Provider store={store}>
                <div className="App">
                  {/* Navbar */}
                  <Navbar
                    adminName={
                      this.state.adminDetails &&
                      this.state.adminDetails.admin_name
                    }
                  />

                  {/* Sidebar */}
                  <Sidebar adminPermission={this.state.adminPermission} />

                  <div>
                    {/* Content */}
                    {this.props.children}

                    {/* Footer */}
                    <Footer />
                  </div>
                </div>
              </Provider>
            ) : (
              <SignInAdmin />
            )}
          </>
        )}
      </>
    );
  }
}

export default AdminMain;
