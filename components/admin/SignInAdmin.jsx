import React, { Component } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import Axios from 'axios';
import Link from 'next/link';

class SignInAdmin extends Component {
  state = {
    user_email: '',
    user_password: '',
    loginError: ''
  };
  validated__input = (inputId, stateValue, regex) => {
    const input = document.getElementById(inputId);
    const value = stateValue;
    if (regex.test(value)) {
      return true;
    } else {
      input.focus();
      input.placeholder = 'Input this Field';
      this.setState({ loginError: 'This Field is Require' });
      return false;
    }
  };
  validated__form = () => {
    if (
      !this.validated__input(
        'user_email',
        this.state.user_email,
        /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
      ) ||
      !this.validated__input(
        'user_password',
        this.state.user_password,
        /^.{6,}$/
      )
    ) {
      return false;
    }
    return true;
  };
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.validated__form()) {
      return;
    }
    try {
      const admin = await Axios.post('/api/users/signin', this.state);
      if (admin.data.err) {
        this.setState({ loginError: admin.data.err });
      } else if (admin.data.adminDetails) {
        const objAdmin = {
          admin_name: admin.data.adminDetails.user_name,
          admin_key: admin.data.adminDetails._id
        };
        window.sessionStorage.setItem(
          'adminPageAccess',
          JSON.stringify(objAdmin)
        );
        window.location = '/admin';
      } else {
        this.setState({ loginError: 'Can not handle this error' });
      }
    } catch (err) {
      this.setState({ loginError: err.message });
    }
  };
  render() {
    return (
      <div>
        <Paper
          elevation={1}
          style={{
            position: 'fixed',
            transform: 'translate(-50%, -50%)',
            top: '40%',
            left: '50%',
            padding: '20px 50px',
            minHeight: '50%'
          }}
        >
          <h2 style={{ color: 'gray' }}>
            Sign In Admin
            <Link href="/">
              <a>
                <Button
                  variant="contained"
                  color="default"
                  style={{ float: 'right' }}
                >
                  Back
                </Button>
              </a>
            </Link>
          </h2>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            style={{ margin: 'auto' }}
          >
            <TextField
              style={{ width: '300px' }}
              id="user_email"
              margin="normal"
              label="Email"
              onChange={this.handleChange('user_email')}
            />
            <br />
            <TextField
              style={{ width: '300px' }}
              id="user_password"
              margin="normal"
              label="Password"
              onChange={this.handleChange('user_password')}
              type="password"
            />
            {/* inner error */}
            <p style={{ color: 'red' }}>{this.state.loginError}</p>
            <Button
              color="primary"
              style={{ marginTop: 10 }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default SignInAdmin;
