import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { ShoppingCart } from '@material-ui/icons';

export class SigninedNav extends Component {
  render() {
    return (
      <>
        <Button
          onClick={this.props.handleProfileMenuOpen}
          style={{ marginRight: 5 }}
          color="inherit"
          variant="outlined"
        >
          Hello {this.props.userName}
        </Button>
        <Button
          onClick={this.props.onLogout}
          color="inherit"
          variant="outlined"
        >
          Logout
        </Button>
        <Link href="/cart">
          <Button
            color="inherit"
            variant="contained"
            style={{ marginLeft: 5, background: '#5773f3' }}
          >
            <ShoppingCart />
          </Button>
        </Link>
        <Link href="/bill">
          <Button
            color="inherit"
            variant="contained"
            style={{ marginLeft: 5, background: '#5773f3' }}
          >
            Bills
          </Button>
        </Link>
      </>
    );
  }
}

export default SigninedNav;
