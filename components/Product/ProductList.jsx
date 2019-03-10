import React, { Component } from 'react';
import { Grid, Fab } from '@material-ui/core';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

export class ProductList extends Component {
  state = {
    productsOnPage: null,
    pages: 1,
    currentPageButton: 1
  };

  renderPage = products => {
    this.setState({
      productsOnPage: products.slice(0, 10),
      pages: Math.ceil(products.length / 10)
    });
  };

  componentDidMount() {
    this.renderPage(this.props.products);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products)
      this.renderPage(nextProps.products);
  }

  handleChagePage = page => () => {
    if (!page) return;
    const start = (page - 1) * 10;
    const end = page * 10;
    this.setState({
      ...this.state,
      productsOnPage: this.props.products.slice(start, end),
      currentPageButton: page
    });
  };

  // get page buttons
  pageButtons = () => {
    let pageButtons = [];
    for (let i = 0; i < this.state.pages; i++) {
      pageButtons.push(
        <a href="#content">
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
        </a>
      );
    }
    return pageButtons;
  };

  render() {
    return (
      <>
        <Grid
          container
          spacing={16}
          alignItems="stretch"
          justify="center"
          style={{ marginTop: 50 }}
        >
          {this.state.productsOnPage &&
            this.state.productsOnPage.map(product => (
              <Grid item xs="auto" key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        {this.state.pages !== 1 && (
          <Grid container justify="center" style={{ marginTop: 30 }}>
            {this.pageButtons().map(btn => btn)}
          </Grid>
        )}
      </>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
