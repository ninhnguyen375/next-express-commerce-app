import React, { Component } from 'react';
import Product from '../../components/admin/product/Product';
import EditProduct from '../../components/admin/product/EditProduct';

export class product extends Component {
  render() {
    return (
      <>
        {this.props.query.id ? (
          <EditProduct id={this.props.query.id} />
        ) : (
          <Product />
        )}
      </>
    );
  }
}

export default product;
