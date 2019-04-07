import React, { Component } from 'react';
import Axios from 'axios';
import { TextField, Button } from '@material-ui/core';

class resetPassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    resetMess: 'Null'
  };
  async componentDidMount() {
    const { token } = this.props.query;
    if (!token) return;

    const reset = await Axios.get('/api/users/resetPassword/' + token);

    if (reset.data.err) this.setState({ resetMess: reset.data.err });
    else this.setState({ resetMess: '' });
  }
  handleSubmit = async e => {
    e.preventDefault();
    const { token } = this.props.query;
    if (!token) return;
    if (this.state.newPassword !== this.state.confirmPassword) return;
    const reset = await Axios.post('/api/users/resetPassword', {
      token: token,
      newPassword: this.state.newPassword
    });
    if (reset.data.err) this.setState({ resetMess: reset.data.err });
    else this.setState({ resetMess: 'Success' });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        {this.state.resetMess ? (
          <h3 className="text-center">{this.state.resetMess}</h3>
        ) : (
          <form className="formResetPassword" onSubmit={this.handleSubmit}>
            <h1 className="title">Set New Password</h1>
            <TextField
              onChange={this.handleChange}
              name="newPassword"
              inputProps={{ pattern: '.{6,}' }}
              label="New Password"
              required
              type="password"
            />
            <br />
            <TextField
              onChange={this.handleChange}
              name="confirmPassword"
              inputProps={{ pattern: '.{6,}' }}
              label="Confirm Password"
              required
              type="password"
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        )}
      </>
    );
  }
}

export default resetPassword;
