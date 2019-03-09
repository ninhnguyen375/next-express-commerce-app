import React, { Component } from 'react';
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Router from 'next/router';

export class SearchBar extends Component {
  state = {
    searchValue: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    Router.push(`/search?searchValue=${this.state.searchValue}`);
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            name="searchValue"
            type="search"
            placeholder="Search…"
            onChange={this.handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
