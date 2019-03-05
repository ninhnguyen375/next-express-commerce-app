import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';
export class ProductList extends Component {
  render() {
    const { products } = this.props;
    console.log(this.context);
    return (
      <Grid
        container
        spacing={16}
        alignItems="stretch"
        justify="center"
        style={{ marginTop: 50 }}
      >
        {products.map(product => (
          <Grid item xs="auto" key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ProductList;
