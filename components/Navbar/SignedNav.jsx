import React, { Component } from 'react';
import Link from 'next/link';
import { People } from '@material-ui/icons';
import { Button, ButtonBase } from '@material-ui/core';

class SignedNav extends Component {
  render() {
    return (
      <div>
        <button className="btn-outline-secondary dropdown">
          {this.props.userName}
          {this.props.isAdmin && (
            <div className="dropdown-content">
              <Link href="/admin">
                <a>Admin manager</a>
              </Link>
            </div>
          )}
        </button>
        <button onClick={this.props.onLogout}>Sign Out</button>
        <Link href="/cart">
          <a>
            <button>Cart</button>
          </a>
        </Link>
        <Link href="/bill">
          <a>
            <button>Bill</button>
          </a>
        </Link>
      </div>
    );
  }
}

export default SignedNav;
