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
      productsOnPage: products.slice(0, 8),
      pages: Math.ceil(products.length / 8)
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
    const start = (page - 1) * 8;
    const end = page * 8;
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
        <a href="#content" key={i}>
          <Fab
            onClick={this.handleChagePage(i + 1)}
            size="small"
            style={{ margin: 5, boxShadow: 'none' }}
            color={
              this.state.currentPageButton === i + 1 ? 'primary' : 'default'
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
          spacing={40}
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
