import React, { Component } from 'react';
import Axios from 'axios';
import ProductDetails from '../components/Product/ProductDetails';
import { Divider } from '@material-ui/core';
import ProductList from '../components/Product/ProductList';

class product extends Component {
  static async getInitialProps(ctx) {
    const id = ctx.query.id;
    let url = '';

    // check for server render or client render
    if (!ctx.req || !ctx.req.headers) {
      url = `/api/products/${id}`;
    } else {
      url = `http://${ctx.req.headers.host}/api/products/${id}`;
    }

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
  state = {
    products: [],
    err: ''
  };

  getProducts = async () => {
    try {
      const res = await Axios.get('/api/products');
      const products = res.data.data;

      this.setState({
        ...this.state,
        products
      });
    } catch (err) {
      this.setState({ ...this.state, err: err.message });
    }
  };

  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>Product Details</h1>
        <Divider />

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
        <Divider style={{ margin: 30 }} />

        {this.state.products[0] ? (
          <ProductList products={this.state.products.slice(15, 20)} />
        ) : (
          <div style={{ textAlign: 'center', color: 'gray' }}>loading</div>
        )}
      </>
    );
  }
}

export default product;
