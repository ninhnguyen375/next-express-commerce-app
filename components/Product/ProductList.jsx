import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

import Pagination from './Pagination';

export class ProductList extends Component {
  state = {
    productsOnPage: null,
    pages: 1,
    currentPage: 1
  };

  renderPage = products => {
    this.setState({
      productsOnPage: products.slice(0, 8),
      pages: Math.ceil(products.length / 8),
      currentPage: 1
    });
  };

  componentDidMount() {
    this.renderPage(this.props.products);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products)
      this.renderPage(nextProps.products);
  }

  handleChangePage = page => () => {
    if (!page) return;
    const start = (page - 1) * 8;
    const end = page * 8;
    this.setState({
      ...this.state,
      productsOnPage: this.props.products.slice(start, end),
      currentPage: page
    });
  };

  handleClickPrevPage = () => {
    this.handleChangePage(this.state.currentPage - 1);
  };
  handleClickNextPage = () => {
    this.handleChangePage(this.state.currentPage + 1);
  };

  render() {
    return (
      <>
        <div className={'product-list__container'}>
          {this.state.productsOnPage &&
            this.state.productsOnPage.map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
        {/* Page Buttons */}
        {this.state.pages !== 1 && (
          <Grid
            container
            justify="center"
            style={{
              marginTop: 30
            }}
          >
            <Pagination
              currPage={this.state.currentPage}
              lastPage={this.state.pages}
              handleChangePage={this.handleChangePage}
            />
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
