import React, { Component } from 'react';
import SearchForm from '../components/Product/SearchForm';
import Axios from 'axios';
import ProductList from '../components/Product/ProductList';
import { Divider } from '@material-ui/core';

export class search extends Component {
  state = {
    categories: [],
    products: [],
    searchResult: [],
    isLoading: true
  };

  async componentDidMount() {
    const products = await Axios.get('/api/products');
    const categories = await Axios.get('/api/producers');
    this.setState({
      ...this.state,
      isLoading: false,
      categories: categories.data.data,
      products: products.data.data
    });
    this.renderSearchResult({
      product_name: this.props.query.searchValue
    });
  }

  renderSearchResult = query => {
    let products = [...this.state.products];

    // filter by name
    if (query.product_name) {
      products = products.filter(
        item =>
          item.product_name
            .toLowerCase()
            .trim()
            .indexOf(query.product_name.toLowerCase().trim()) !== -1
      );
    }

    // filter by category - producer
    if (query.producer) {
      products = products.filter(item => item.producer === query.producer);
    }

    // filter by price
    if (query.product_price && query.product_price.from) {
      products = products.filter(
        item =>
          item.product_price >= query.product_price.from &&
          item.product_price <= query.product_price.to
      );
    }

    // sort by price
    if (query.sortByPrice) {
      products.sort((a, b) => {
        if (query.sortByPrice === 'Asc')
          return a.product_price - b.product_price;
        else return b.product_price - a.product_price;
      });
    }

    // sort by name
    if (query.sortByName) {
      products.sort((a, b) => {
        const name_a = a.product_name.toLowerCase();
        const name_b = b.product_name.toLowerCase();
        if (query.sortByName === 'A-Z') return name_a < name_b ? -1 : 1;
        else return name_a > name_b ? -1 : 1;
      });
    }

    this.setState({ searchResult: products });
  };

  render() {
    return (
      <>
        <style jsx global>{`
          * {
            scroll-behavior: smooth;
          }
        `}</style>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>YOUR SEARCH</h1>
        <div className="divider" />
        <SearchForm
          categories={this.state.categories}
          renderSearchResult={this.renderSearchResult}
        />
        {this.state.isLoading ? (
          <div className="loading-text">Loading...</div>
        ) : (
          <>
            {this.state.searchResult[0] ? (
              <ProductList products={this.state.searchResult} />
            ) : (
              <h1 style={{ color: 'gray', textAlign: 'center' }}>Empty</h1>
            )}
          </>
        )}
      </>
    );
  }
}

export default search;
