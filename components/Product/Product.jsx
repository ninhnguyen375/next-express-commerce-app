import React, { Component } from 'react';
import ProductList from './ProductList';
import Axios from 'axios';

export class Product extends Component {
  state = {
    products: [],
    err: null,
    isLoading: true
  };

  getProducts = async category => {
    this.setState({ isLoading: true });
    try {
      const res = category
        ? await Axios.get(`/api/products?producer_id=${category}`)
        : await Axios.get('/api/products');
      const products = res.data.data;
      this.setState({ ...this.state, products });
    } catch (err) {
      this.setState({ ...this.state, err: err.message });
    }
    this.setState({ isLoading: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category)
      this.getProducts(this.props.category);
  }

  componentDidMount() {
    this.getProducts(this.props.category);
  }

  render() {
    const { products, isLoading } = this.state;
    return (
      <>
        {products[0] ? (
          <ProductList products={products} />
        ) : (
          <h3 className={'text-gray text-center'}>
            {isLoading ? 'Loading...' : 'Empty'}
          </h3>
        )}
      </>
    );
  }
}

export default Product;
