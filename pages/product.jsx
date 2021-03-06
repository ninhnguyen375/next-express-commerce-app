import React, { Component } from 'react';
import Axios from 'axios';
import ProductDetails from '../components/Product/ProductDetails';
import { Divider } from '@material-ui/core';
import ProductList from '../components/Product/ProductList';

const isServer = !process.browser;
const isProduction = !process.env.NODE_ENV === 'production';

class product extends Component {
  state = {
    isLoading: false,
    products: [],
    err: ''
  };

  static async getInitialProps(ctx) {
    const id = ctx.query.id;
    const url = isServer
      ? `${isProduction ? 'https' : 'http'}://${
          ctx.req.headers.host
        }/api/products/${id}`
      : `/api/products/${id}`;

    try {
      const res = await Axios.get(url);

      if (res.data) {
        if (res.data.err) {
          return { getError: res.data.err };
        } else {
          return {
            product: res.data.product,
            producer: res.data.producer
          };
        }
      } else return { getError: 'server not response' };
    } catch (err) {
      return { getError: err.message };
    }
  }

  getProducts = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await Axios.get('/api/products');
      const products = res.data.data;

      this.setState({
        ...this.state,
        products,
        isLoading: false
      });
    } catch (err) {
      this.setState({ ...this.state, err: err.message, isLoading: false });
    }
  };

  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>Product Details</h1>
        <div className="divider" />

        {this.props.getError ? (
          <h3 style={{ color: 'gray', textAlign: 'center' }}>
            {this.props.getError}
          </h3>
        ) : (
          <ProductDetails
            product={this.props.product}
            producer={this.props.producer}
          />
        )}

        <div style={{ marginTop: 100 }} />
        <h1 style={{ color: 'gray', textAlign: 'center' }}>Another Products</h1>
        <div className="divider" />

        {this.state.products[0] ? (
          <ProductList products={this.state.products.slice(12, 20)} />
        ) : (
          <div style={{ textAlign: 'center', color: 'gray' }}>
            {this.state.isLoading ? 'Loading...' : 'Empty'}
          </div>
        )}
      </>
    );
  }
}

export default product;
