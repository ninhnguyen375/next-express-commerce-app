import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';
export class UnSigninedNav extends Component {
  render() {
    return (
      <>
        <Link href="/signin">
          <a>
            <Button
              color="primary"
              variant="outlined"
              style={{ marginLeft: 10 }}
            >
              Login
            </Button>
          </a>
        </Link>
        <Link href="/signup">
          <a>
            <Button
              style={{ marginLeft: 10 }}
              color="primary"
              variant="outlined"
            >
              Sign Up
            </Button>
          </a>
        </Link>
      </>
    );
  }
}

export default UnSigninedNav;
