import React, { Component } from 'react';
import { Button, MenuItem } from '@material-ui/core';
import Link from 'next/link';
import { ShoppingCart } from '@material-ui/icons';

export class SigninedNav extends Component {
  render() {
    const { handleMobileMenuClose, handleProfileMenuOpen } = this.props;
    return (
      <>
        {this.props.screen === 'mobile' ? (
          <>
            <MenuItem onClick={handleMobileMenuClose}>
              {this.props.userName}
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <div onClick={this.props.onLogout}>Logout</div>
            </MenuItem>
            {this.props.isAdmin && (
              <MenuItem onClick={handleMobileMenuClose}>
                <div>
                  <Link href="/admin">
                    <a>Admin Manager</a>
                  </Link>
                </div>
              </MenuItem>
            )}
            <MenuItem onClick={handleMobileMenuClose}>
              <div>
                <Link href="/cart">
                  <a>Your Cart</a>
                </Link>
              </div>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <div>
                <Link href="/bill">
                  <a>Your Bills</a>
                </Link>
              </div>
            </MenuItem>
          </>
        ) : (
          <>
            <Button
              onClick={handleProfileMenuOpen}
              style={{ marginRight: 5, color: this.props.btnColor }}
              color={this.props.btnColor}
              variant="outlined"
            >
              Hello {this.props.userName}
            </Button>
            <Button
              onClick={this.props.onLogout}
              color={this.props.btnColor}
              variant="outlined"
              style={{ color: this.props.btnColor }}
            >
              Logout
            </Button>
            <Link href="/cart">
              <a>
                <Button
                  color="inherit"
                  variant="contained"
                  style={{
                    marginLeft: 5,
                    background: '#5773f3',
                    color: 'white'
                  }}
                >
                  <ShoppingCart />
                </Button>
              </a>
            </Link>
            <Link href="/bill">
              <a>
                <Button
                  color="inherit"
                  variant="contained"
                  style={{
                    marginLeft: 5,
                    background: '#5773f3',
                    color: 'white'
                  }}
                >
                  Bills
                </Button>
              </a>
            </Link>
          </>
        )}
      </>
    );
  }
}

export default SigninedNav;
