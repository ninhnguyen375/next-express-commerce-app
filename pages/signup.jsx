import React, { Component } from 'react';
import { TextField, Button, CircularProgress, Paper } from '@material-ui/core';
import Link from 'next/link';
import Axios from 'axios';
import Router from 'next/router';
import ShopContext from '../context/shop-context';

class signup extends Component {
  static contextType = ShopContext;

  state = {
    user_name: '',
    user_password: '',
    user_phone: '',
    user_email: '',
    confirmPassword: '',
    onLoading: false,
    signupError: ''
  };

  async componentDidMount() {
    await this.context.checkLogin();
    if (this.context.auth.auth_key) Router.push('/');
  }

  validated__input = (thisState, name, regex) => {
    const input = window.document.getElementsByName(name)[0];
    if (!input) return false;
    if (!thisState) {
      input.focus();
      this.setState({ signupError: 'This field is require' });
      return false;
    }
    if (!regex.test(thisState)) {
      input.focus();
      this.setState({ signupError: 'Please complete this field' });
      return false;
    }
    this.setState({ signupError: '' });
    return true;
  };
  validated__confirmPassword = () => {
    if (this.state.user_password !== this.state.confirmPassword) {
      window.document.getElementsByName('confirmPassword')[0].focus();
      this.setState({ signupError: 'confirm password' });
      return false;
    }
    this.setState({ signupError: '' });
    return true;
  };
  validated__form = () => {
    if (
      !this.validated__input(
        this.state.user_email,
        'user_email',
        /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
      ) ||
      !this.validated__input(this.state.user_name, 'user_name', /.{1,}/) ||
      !this.validated__input(
        this.state.user_phone,
        'user_phone',
        /^[0-9]{10,}$/
      ) ||
      !this.validated__input(
        this.state.user_password,
        'user_password',
        /^.{6,}$/
      ) ||
      !this.validated__confirmPassword() ||
      !this.validated__input(this.state.user_name, 'user_name', /.{1,}/)
    ) {
      return false;
    }
    return true;
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  checkDuplicateEmail = async e => {
    try {
      const findUser = await Axios.get(
        '/api/users/find/?user_email=' + this.state.user_email
      );
      if (findUser.data.found)
        this.setState({ signupError: 'This email has been used' });
      else {
        this.setState({ signupError: '' });
      }
    } catch (err) {
      this.setState({ signupError: err.message });
    }
  };
  handleSubmit = async e => {
    this.setState({ onLoading: true });
    e.preventDefault();
    if (this.validated__form()) {
      const signup = await Axios.post('/api/users', {
        user_name: this.state.user_name,
        user_password: this.state.user_password,
        user_phone: this.state.user_phone,
        user_email: this.state.user_email
      });
      if (signup.data.err) {
        this.setState({ signupError: signup.data.err });
      } else {
        this.setState({ signupError: '' });
        Router.push('/signin');
      }
    }
    this.setState({ onLoading: false });
  };
  render() {
    return (
      <>
        <h1 style={{ textAlign: 'center', color: 'gray' }}>SIGN UP</h1>
        <Paper style={{ width: '400px', padding: 20, margin: 'auto' }}>
          <form noValidate onSubmit={this.handleSubmit}>
            <style jsx global>{`
              .textField {
                width: 300px;
              }
            `}</style>
            {/* Email */}
            <TextField
              onBlur={this.checkDuplicateEmail}
              label="Email"
              name="user_email"
              value={this.state.user_email}
              onChange={this.handleChange}
              margin="dense"
              className="textField"
              helperText="123456@example.com"
            />
            <br />
            <TextField
              label="Name"
              name="user_name"
              value={this.state.user_name}
              onChange={this.handleChange}
              margin="dense"
              className="textField"
            />
            <br />
            {/* Phone */}
            <TextField
              label="Phone"
              name="user_phone"
              value={this.state.user_phone}
              onChange={this.handleChange}
              margin="dense"
              className="textField"
              type="number"
              helperText="10 number"
            />
            <br />
            {/* Password */}
            <TextField
              label="Password"
              name="user_password"
              value={this.state.user_password}
              onChange={this.handleChange}
              margin="dense"
              className="textField"
              helperText="min 6 charaters"
              type="password"
            />
            <br />
            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              className="textField"
              value={this.state.confirmPassword}
              type="password"
              onChange={this.handleChange}
              margin="dense"
            />
            {this.state.signupError ? (
              <p style={{ color: 'red' }}>{this.state.signupError}</p>
            ) : (
              <br />
            )}
            {this.state.onLoading ? (
              <Button variant="contained" color="primary" type="button">
                <CircularProgress size={25} color="inherit" />
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Signup
              </Button>
            )}
          </form>
          <p style={{ color: 'gray', fontSize: '12px' }}>
            Have account ?
            <Link href="/signin">
              <a>
                <Button color="primary">sign in</Button>
              </a>
            </Link>
          </p>
        </Paper>
      </>
    );
  }
}

export default signup;
