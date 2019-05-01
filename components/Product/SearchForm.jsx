import React, { Component } from 'react';
import { TextField, MenuItem, Select, Button } from '@material-ui/core';

export class SearchForm extends Component {
  state = {
    searchByPriceTo: '',
    searchByPriceFrom: '',
    searchByName: '',
    searchByCategory: '',
    sortByName: '',
    sortByPrice: ''
  };
  handleReset = () => {
    this.setState({
      searchByPriceTo: '',
      searchByPriceFrom: '',
      searchByName: '',
      searchByCategory: '',
      sortByName: '',
      sortByPrice: ''
    });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    const query = {
      product_price: {
        from: parseInt(this.state.searchByPriceFrom, 10),
        to: parseInt(this.state.searchByPriceTo, 10)
      },
      product_name: this.state.searchByName,
      producer: this.state.searchByCategory,
      sortByPrice: this.state.sortByPrice,
      sortByName: this.state.sortByName
    };
    this.props.renderSearchResult(query);
  };

  render() {
    return (
      <>
        <style jsx>{`
          .search-form {
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            justify-content: center;
          }
          .search-form * {
            margin: 3px;
          }
        `}</style>
        <form onSubmit={this.handleSubmitSearch} className="search-form">
          {/* Search by name */}
          <div>
            <div>Search by Name</div>
            <TextField
              onChange={this.handleChange}
              label="Search by name"
              name="searchByName"
            />
          </div>

          {/* Search by price */}
          <div>
            <div>Search by Price</div>
            <TextField
              label="From"
              name="searchByPriceFrom"
              onChange={this.handleChange}
              style={{ width: 100 }}
            />
            <TextField
              label="To"
              name="searchByPriceTo"
              onChange={this.handleChange}
              style={{ width: 100 }}
            />
          </div>
          <br />
          {/* Select Category */}
          <div>
            <div>Category</div>
            <br />
            <Select
              style={{ width: 150 }}
              value={this.state.searchByCategory}
              onChange={this.handleChange}
              inputProps={{
                name: 'searchByCategory'
              }}
            >
              <MenuItem value="">All</MenuItem>

              {this.props.categories &&
                this.props.categories.map((item, index) => (
                  <MenuItem key={index} value={item.producer_name}>
                    {item.producer_name}
                  </MenuItem>
                ))}
            </Select>
          </div>

          {/* Sort by Price */}
          <div>
            <div>Sort by Price</div>
            <br />
            <Select
              style={{ width: 150 }}
              value={this.state.sortByPrice}
              onChange={this.handleChange}
              inputProps={{
                name: 'sortByPrice'
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Asc">Asc</MenuItem>
              <MenuItem value="Desc">Desc</MenuItem>
            </Select>
          </div>

          {/* Sort by Name */}
          <div>
            <div>Sort by Name</div>
            <br />
            <Select
              style={{ width: 150 }}
              value={this.state.sortByName}
              onChange={this.handleChange}
              inputProps={{
                name: 'sortByName'
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="A-Z">A-Z</MenuItem>
              <MenuItem value="Z-A">Z-A</MenuItem>
            </Select>
          </div>

          {/* reset */}
          <Button onClick={this.handleReset} type="reset">
            reset
          </Button>
          {/* Filter */}
          <Button type="submit" variant="contained" color="primary">
            Filter
          </Button>
        </form>
      </>
    );
  }
}

export default SearchForm;
