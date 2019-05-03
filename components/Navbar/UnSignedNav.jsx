import React, { Component } from 'react';
import Link from 'next/link';
class UnSignedNav extends Component {
  render() {
    return (
      <div>
        <Link href="/">
          <a>
            <button>Home</button>
          </a>
        </Link>
        <Link href="/signin">
          <a>
            <button>Sign In</button>
          </a>
        </Link>
        <Link href="/signup">
          <a>
            <button>Sign Up</button>
          </a>
        </Link>
      </div>
    );
  }
}

export default UnSignedNav;
