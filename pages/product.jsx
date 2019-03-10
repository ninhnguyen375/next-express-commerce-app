import React, { Component } from 'react';
import Axios from 'axios';
import ProductDetails from '../components/Product/ProductDetails';
import { Divider } from '@material-ui/core';
import ProductList from '../components/Product/ProductList';

class product extends Component {
  state = {
    product: '',
    producer: '',
    getError: '',
    products: [],
    err: ''
  };
  static async getInitialProps({ query }) {
    return { id: query.id };
  }
  // Get product from server
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
  getProduct = async () => {
    try {
      const promiseData = await Axios.get(`/api/products/${this.props.id}`);

      if (promiseData.data) {
        if (promiseData.data.err)
          this.setState({ getError: promiseData.data.err });
        else
          this.setState({
            product: promiseData.data.product,
            producer: promiseData.data.producer
          });
      } else this.setState({ getError: 'server not response' });
    } catch (err) {
      this.setState({ getError: err.message });
    }
  };
  componentDidUpdate() {
    this.getProduct();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidMount() {
    this.getProducts();
    this.getProduct();
  }
  render() {
    return (
      <>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>Product Details</h1>
        <Divider />

        {this.state.getError ? (
          <h3 style={{ color: 'gray', textAlign: 'center' }}>
            {this.state.getError}
          </h3>
        ) : (
          <>
            {this.state.product ? (
              <ProductDetails
                product={this.state.product}
                producer={this.state.producer}
              />
            ) : (
              <h4 style={{ color: 'gray', textAlign: 'center' }}>Loading...</h4>
            )}
          </>
        )}

        <div style={{ marginTop: 100 }} />
        <h1 style={{ color: 'gray', textAlign: 'center' }}>Another Products</h1>
        <Divider style={{ margin: 30 }} />
        <ProductList products={this.state.products.slice(15, 20)} />
      </>
    );
  }
}

export default product;
