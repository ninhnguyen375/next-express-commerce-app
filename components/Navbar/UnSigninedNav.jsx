import React, { Component } from 'react';
import { Button, MenuItem } from '@material-ui/core';
import Link from 'next/link';
export class UnSigninedNav extends Component {
  render() {
    let { btnColor } = this.props;
    let Color = btnColor;
    if (btnColor === 'inherit') Color = 'white';
    return (
      <>
        {this.props.screen === 'mobile' ? (
          <>
            <MenuItem onClick={this.props.handleMobileMenuClose}>
              <div>
                <Link href="/signin">
                  <a>
                    <Button
                      color={btnColor}
                      variant="outlined"
                      style={{ marginLeft: 10, color: Color }}
                    >
                      Login
                    </Button>
                  </a>
                </Link>
              </div>
            </MenuItem>
            <MenuItem onClick={this.props.handleMobileMenuClose}>
              <div>
                <Link href="/signup">
                  <a>
                    <Button
                      style={{ marginLeft: 10, color: Color }}
                      color={btnColor}
                      variant="outlined"
                    >
                      Sign Up
                    </Button>
                  </a>
                </Link>
              </div>
            </MenuItem>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a>
                <Button
                  color={btnColor}
                  variant="outlined"
                  style={{ marginLeft: 10, color: Color }}
                >
                  Login
                </Button>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <Button
                  style={{ marginLeft: 10, color: Color }}
                  color={btnColor}
                  variant="outlined"
                >
                  Sign Up
                </Button>
              </a>
            </Link>
          </>
        )}
      </>
    );
  }
}

export default UnSigninedNav;
