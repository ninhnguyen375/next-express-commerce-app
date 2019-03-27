import React, { Component } from 'react';
import './Navbar.scss';
import SignedNav from './SignedNav';
import UnSignedNav from './UnSignedNav';
import Link from 'next/link';
import Router from 'next/router';

class Navbar extends Component {
  state = {
    signed: true,
    searchValue: 'a'
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSearch = e => {
    e.preventDefault();
    Router.push(`/search?searchValue=${this.state.searchValue}`);
  };
  render() {
    return (
      <>
        <div className="Navbar none-bg">
          <div className="left-menu">
            <Link href="/">
              <a>
                <img src="/static/logo.png" alt="logo-brand" />
              </a>
            </Link>
          </div>
          <div className="right-menu">
            <nav className="nav-item">
              <Link href="/">
                <a>
                  <button>Home</button>
                </a>
              </Link>
              {this.props.auth.auth_key ? (
                <SignedNav
                  onLogout={this.props.onLogout}
                  userName={this.props.auth.auth_name}
                  isAdmin={this.props.auth.auth_group === 'admin'}
                />
              ) : (
                <UnSignedNav />
              )}
            </nav>
            <div className="search-bar">
              <form onSubmit={this.handleSearch}>
                <input
                  placeholder="Search Here"
                  type="search"
                  name="searchValue"
                  onChange={this.handleChange}
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
