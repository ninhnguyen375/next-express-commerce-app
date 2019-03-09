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
          color="default"
          variant="outlined"
        >
          Hello {this.props.userName}
        </Button>
        <Button
          onClick={this.props.onLogout}
          color="primary"
          variant="outlined"
        >
          Logout
        </Button>
        <Link href="/cart">
          <Button color="primary" variant="contained" style={{ marginLeft: 5 }}>
            <ShoppingCart />
          </Button>
        </Link>
        <Link href="/bill">
          <Button color="primary" variant="contained" style={{ marginLeft: 5 }}>
            Bills
          </Button>
        </Link>
      </>
    );
  }
}

export default SigninedNav;
