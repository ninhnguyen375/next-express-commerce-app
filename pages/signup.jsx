import React, { Component } from 'react';
import { TextField, Button, CircularProgress, Paper } from '@material-ui/core';
import Link from 'next/link';
import Axios from 'axios';
import Router from 'next/router';
import ShopContext from '../context/shop-context';

class signup extends Component {
  static contextType = ShopContext;

  state = {
    user_name: {
      value: '',
      error: true
    },
    user_password: {
      value: '',
      error: true
    },
    user_phone: {
      value: '',
      error: true
    },
    user_email: {
      value: '',
      error: true
    },
    confirmPassword: {
      value: '',
      error: true
    },
    onLoading: false,
    isDoublicateEmail: false,
    signupError: ''
  };

  async componentDidMount() {
    await this.context.checkLogin();
    if (this.context.auth.auth_key) Router.push('/');
  }

  validated__form = () => {
    const {
      confirmPassword,
      user_email,
      user_name,
      user_phone,
      user_password,
      isDoublicateEmail
    } = this.state;

    if (user_email.error || isDoublicateEmail) {
      document.querySelector("input[name='user_email']").focus();
      return false;
    }
    if (user_name.error) {
      document.querySelector("input[name='user_name']").focus();
      return false;
    }
    if (user_phone.error) {
      document.querySelector("input[name='user_phone']").focus();
      return false;
    }
    if (user_password.error) {
      document.querySelector("input[name='user_password']").focus();
      return false;
    }
    console.log(user_password.value, confirmPassword.value);

    if (user_password.value !== confirmPassword.value) {
      this.setState({ confirmPassword: { ...confirmPassword, error: true } });
      document.querySelector("input[name='confirmPassword']").focus();
      return false;
    }
    return true;
  };

  handleChange = e => {
    const regex = new RegExp(e.target.pattern);

    if (!regex.test(e.target.value)) {
      this.setState({
        [e.target.name]: { value: e.target.value, error: true }
      });
    } else {
      this.setState({
        [e.target.name]: { value: e.target.value, error: false }
      });
    }
  };

  checkDuplicateEmail = async () => {
    const { user_email } = this.state;

    try {
      const findUser = await Axios.get(
        '/api/users/find/?user_email=' + user_email.value
      );
      if (findUser.data.found)
        this.setState({ ...this.state, isDoublicateEmail: true });
      else {
        this.setState({ ...this.state, isDoublicateEmail: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async e => {
    const { user_email, user_name, user_password, user_phone } = this.state;
    this.setState({ onLoading: true });
    e.preventDefault();

    if (!this.validated__form()) {
      this.setState({ onLoading: false });
      return;
    } else {
      try {
        const signup = await Axios.post('/api/users', {
          user_name: user_name.value,
          user_password: user_password.value,
          user_phone: user_phone.value,
          user_email: user_email.value
        });
        if (signup.data.err) {
          this.setState({ signupError: signup.data.err });
        } else {
          this.setState({ signupError: '' });
          Router.push('/signin');
        }
      } catch (err) {
        console.log(err);
      }
    }
    this.setState({ onLoading: false });
  };

  render() {
    const {
      user_email,
      user_password,
      user_name,
      user_phone,
      signupError,
      onLoading,
      confirmPassword,
      isDoublicateEmail
    } = this.state;
    return (
      <>
        <form className={'form-center'} noValidate onSubmit={this.handleSubmit}>
          <div className={'text-center title'}>SIGN UP</div>
          {/* Email */}
          <TextField
            required
            error={user_email.error || isDoublicateEmail}
            onBlur={this.checkDuplicateEmail}
            label="Email"
            name="user_email"
            defaultValue={user_email.value}
            onChange={e => {
              this.handleChange(e);
            }}
            margin="dense"
            className="textField"
            helperText={
              isDoublicateEmail
                ? 'This email has been used'
                : '123456@example.com'
            }
            inputProps={{
              pattern: '[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}'
            }}
          />
          {/* Name */}
          <TextField
            error={user_name.error}
            required
            label="Name"
            name="user_name"
            defaultValue={user_name.value}
            onChange={this.handleChange}
            margin="dense"
            className="textField"
            inputProps={{
              pattern: '^[ ._A-z0-9]*$'
            }}
            helperText={'no speacial character [!,@,#,$,%,^,&,*]'}
          />
          {/* Phone */}
          <TextField
            error={user_phone.error}
            required
            label="Phone"
            name="user_phone"
            defaultValue={user_phone.value}
            onChange={this.handleChange}
            margin="dense"
            className="textField"
            type="number"
            helperText="10 number, first number is 0"
            inputProps={{ pattern: '0[0-9]{9}' }}
          />
          {/* Password */}
          <TextField
            error={user_password.error}
            required
            label="Password"
            name="user_password"
            defaultValue={user_password.value}
            onChange={this.handleChange}
            margin="dense"
            className="textField"
            helperText="min 6 charaters"
            type="password"
            inputProps={{ pattern: '.{6,}' }}
          />
          {/* Confirm Password */}
          <TextField
            error={confirmPassword.error}
            required
            label="Confirm Password"
            name="confirmPassword"
            className="textField"
            defaultValue={confirmPassword.value}
            type="password"
            onChange={this.handleChange}
            margin="dense"
            inputProps={{ pattern: '.{6,}' }}
          />

          {signupError && <div style={{ color: 'red' }}>{signupError}</div>}

          {onLoading ? (
            <Button
              className={'submit'}
              variant="contained"
              color="primary"
              type="button"
            >
              <CircularProgress size={25} color="inherit" />
            </Button>
          ) : (
            <Button
              className={'submit'}
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign up
            </Button>
          )}

          <p style={{ color: 'gray', fontSize: '12px' }}>
            Have account ?
            <Link href="/signin">
              <a>
                <Button color="primary">sign in</Button>
              </a>
            </Link>
          </p>
        </form>
      </>
    );
  }
}

export default signup;
