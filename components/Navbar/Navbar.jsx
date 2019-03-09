import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core';
import Link from 'next/link';
import SigninedNav from './SigninedNav';
import UnSigninedNav from './UnSigninedNav';
import CategoryList from '../CategoryList';
import SearchBar from './SearchBar';
import { More } from '@material-ui/icons';

export class Navbar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };
  handleProfileMenuOpen = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  handleMobileMenuOpen = e => {
    this.setState({ mobileMoreAnchorEl: e.currentTarget });
  };
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
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
        <MenuItem onClick={this.handleMobileMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ flexGrow: '1' }}
            >
              <Link href="/">
                <a>ShopPhone</a>
              </Link>
            </Typography>

            {/* Search bar */}
            <SearchBar />

            <CategoryList />
            {!this.props.auth.auth_key ? (
              <UnSigninedNav />
            ) : (
              <SigninedNav
                onLogout={this.props.onLogout}
                userName={this.props.auth.auth_name}
              />
            )}
            <More onClick={this.handleProfileMenuOpen} />
            <More onClick={this.handleMobileMenuOpen} />
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </>
    );
  }
}

export default Navbar;
