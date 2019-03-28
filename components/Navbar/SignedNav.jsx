import React, { Component } from 'react';
import Link from 'next/link';

class SignedNav extends Component {
  render() {
    return (
      <div>
        <button className="btn-outline-secondary dropdown">
          {this.props.userName}
          <div className="dropdown-content">
            {this.props.isAdmin && (
              <Link href="/admin">
                <a>
                  <div className="dropdown-item">Admin manager</div>
                </a>
              </Link>
            )}
            <Link href="/profile">
              <a>
                <div className="dropdown-item">Profile</div>
              </a>
            </Link>
          </div>
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
