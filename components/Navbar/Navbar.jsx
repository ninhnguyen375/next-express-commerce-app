import React from 'react';
import Link from 'next/link';
import MoreIcon from '@material-ui/icons/MoreVert';

import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  AppBar
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import UnSigninedNav from './UnSigninedNav';
import SigninedNav from './SigninedNav';
import { SearchBar } from './SearchBar';
import CategoryList from '../CategoryList';
import NavbarStyle from './Nabar.styles';

const styles = NavbarStyle;

class Navbar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <>
        {this.props.auth.auth_group === 'admin' && (
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}
          >
            <div>
              <Link href="/admin">
                <a>
                  <MenuItem onClick={this.handleMenuClose}>
                    Admin Manager
                  </MenuItem>
                </a>
              </Link>
            </div>
          </Menu>
        )}
      </>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <CategoryList onMobileMenuClose={this.handleMobileMenuClose} />
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose}>
          {!this.props.auth.auth_key ? (
            <UnSigninedNav />
          ) : (
            <SigninedNav
              onLogout={this.props.onLogout}
              userName={this.props.auth.auth_name}
            />
          )}
        </MenuItem>
      </Menu>
    );

    return (
      <>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Link href="/">
              <a>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                  style={{ color: 'white' }}
                >
                  ShopPhone
                </Typography>
              </a>
            </Link>

            {/* Search bar */}
            <SearchBar classes={classes} />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* Categories */}
              <CategoryList />

              {!this.props.auth.auth_key ? (
                <UnSigninedNav />
              ) : (
                <SigninedNav
                  onLogout={this.props.onLogout}
                  userName={this.props.auth.auth_name}
                  handleProfileMenuOpen={this.handleProfileMenuOpen}
                />
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </>
    );
  }
}

export default withStyles(styles)(Navbar);
