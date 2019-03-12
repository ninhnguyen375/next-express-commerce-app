import React, { Component } from 'react';
import ProductList from './ProductList';
import Axios from 'axios';

export class Product extends Component {
  state = {
    products: [],
    err: null
  };
  // Get products from server
  getProducts = async category => {
    try {
      const res = category
        ? await Axios.get('/api/products?producer_id=' + category)
        : await Axios.get('/api/products');
      const products = res.data.data;

      this.setState({
        ...this.state,
        products
      });
    } catch (err) {
      this.setState({ ...this.state, err: err.message });
    }
  };

  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category)
      await this.getProducts(this.props.category);
  }

  async componentDidMount() {
    this.props.category
      ? await this.getProducts(this.props.category)
      : await this.getProducts();
  }

  render() {
    return (
      <>
        {this.state.products[0] ? (
          <ProductList products={this.state.products} />
        ) : (
          <h3 style={{ color: 'gray', textAlign: 'center' }}>Empty</h3>
        )}
      </>
    );
  }
}

export default Product;
