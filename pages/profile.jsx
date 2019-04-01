import React, { Component } from 'react';
import ShopContext from '../context/shop-context';
import Axios from 'axios';
import Link from 'next/link';
import { Divider, Button, TextField } from '@material-ui/core';

class profile extends Component {
  static contextType = ShopContext;
  state = {
    user: null,
    getError: null,
    currPassword: '',
    newPassword: '',
    editPassword: false,
    editMess: ''
  };
  async componentDidMount() {
    await this.context.checkLogin();
    console.log(this.context);

    if (this.context.auth.auth_key) {
      try {
        const user = await Axios.get(
          '/api/users/' + this.context.auth.auth_key
        );
        if (user.data.err) this.setState({ getError: user.data.err });
        else {
          console.log('setted', user.data);

          this.setState({ user: user.data.user });
        }
      } catch (err) {
        this.setState({ getError: err.message });
      }
    } else {
      console.log('none auth');
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleEditPassword = () => {
    this.setState({ editPassword: !this.state.editPassword });
  };

  handleEditPassword = async e => {
    e.preventDefault();
    try {
      const res = await Axios.put(
        `/api/users/${this.state.user._id}/editPassword`,
        this.state
      );
      if (res.data.err) this.setState({ editMess: res.data.err });
      else this.setState({ editMess: 'Success' });
    } catch (err) {}
  };

  render() {
    const { user, getError, editPassword } = this.state;
    const userDetails = user
      ? [
          {
            id: 1,
            label: 'Name',
            content: user.user_name
          },
          {
            id: 2,
            label: 'Phone',
            content: user.user_phone
          },
          {
            id: 3,
            label: 'Email',
            content: user.user_email
          },
          {
            id: 4,
            label: 'Password',
            content: <Button onClick={this.toggleEditPassword}>Edit</Button>
          }
        ]
      : null;

    const renderDetails = () => (
      <>
        {userDetails &&
          userDetails.map(item => (
            <div className="row" key={item.id}>
              <div className="col label">{item.label} :</div>
              <div className="col">{item.content}</div>
            </div>
          ))}
      </>
    );

    const renderEditPassword = () => (
      <form onSubmit={this.handleEditPassword}>
        <div className="row">
          <div className="col">
            <TextField
              required
              value={this.state.currPassword}
              type="password"
              inputProps={{ pattern: '.{6,}' }}
              name="currPassword"
              label="Current password"
              onChange={this.handleChange}
            />
          </div>
          <div className="col">
            <TextField
              required
              value={this.state.newPassword}
              type="password"
              inputProps={{ pattern: '.{6,}' }}
              name="newPassword"
              label="New password"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">{this.state.editMess}</div>
        <div className="row">
          <Button type="submit" color="primary" variant="contained">
            Edit
          </Button>
        </div>
      </form>
    );
    return (
      <div>
        {
          <>
            {user ? (
              <div className="profile">
                <h1>Your Profile</h1>
                <Divider />
                <div className="profile-content">
                  {renderDetails()}
                  {editPassword && renderEditPassword()}
                  {/* action */}
                  <div className="row" style={{ justifyContent: 'center' }}>
                    <div
                      className="col"
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      <Link href="/">
                        <a>
                          <Button
                            style={{ width: '100%' }}
                            variant="contained"
                            color="primary"
                          >
                            GO TO SHOPPING
                          </Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h3 style={{ color: 'gray', textAlign: 'center' }}>Loading...</h3>
            )}
            {getError && <h1>{getError}</h1>}
          </>
        }
      </div>
    );
  }
}

export default profile;
