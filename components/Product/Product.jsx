import React, { Component } from 'react';
import ProductList from './ProductList';
import { Grid, Fab } from '@material-ui/core';
import Axios from 'axios';

export class Product extends Component {
  state = {
    products: null,
    err: null,
    productsOnPage: null,
    pages: null,
    currentPageButton: null
  };
  async componentDidMount() {
    try {
      const res = await Axios.get('/api/products');
      const products = res.data.data;

      this.setState({
        ...this.state,
        products,
        productsOnPage: products.slice(0, 10),
        pages: Math.ceil(products.length / 10),
        currentPageButton: 1
      });
    } catch (err) {
      this.setState({ ...this.state, err: err.message });
    }
  }
  handleChagePage = page => () => {
    if (!page) return;
    const start = (page - 1) * 10;
    const end = page * 10;
    this.setState({
      ...this.state,
      productsOnPage: this.state.products.slice(start, end),
      currentPageButton: page
    });
  };
  render() {
    const pageButtons = () => {
      let pageButtons = [];
      for (let i = 0; i < this.state.pages; i++) {
        pageButtons.push(
          <Fab
            onClick={this.handleChagePage(i + 1)}
            key={i}
            size="small"
            style={{ margin: 5, boxShadow: 'none' }}
            color={
              this.state.currentPageButton === i + 1 ? 'secondary' : 'default'
            }
          >
            {i + 1}
          </Fab>
        );
      }
      return pageButtons;
    };
    return (
      <>
        {this.state.products ? (
          <>
            <ProductList products={this.state.productsOnPage} />
            <br />
            <Grid container justify="center">
              {pageButtons().map(btn => btn)}
            </Grid>
          </>
        ) : (
          <h3 style={{ color: 'gray', textAlign: 'center' }}>Loading...</h3>
        )}
      </>
    );
  }
}

export default Product;
