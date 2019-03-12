import React, { Component } from 'react';
import Axios from 'axios';
import ProductDetails, {
  PlaceASeat
} from '../components/Product/ProductDetails';
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

  getProduct = async () => {
    if (!this.props.query.id) return;
    try {
      const res = await Axios.get(`/api/products/${this.props.query.id}`);

      if (res.data) {
        if (res.data.err) {
          this.setState({ getError: res.data.err });
        } else {
          this.setState({
            product: res.data.product,
            producer: res.data.producer
          });
        }
      } else this.setState({ getError: 'server not response' });
    } catch (err) {
      this.setState({ getError: err.message });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query.id !== prevProps.query.id) {
      this.getProduct();
    }
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
            {this.state.producer ? (
              <ProductDetails
                product={this.state.product}
                producer={this.state.producer}
              />
            ) : (
              <PlaceASeat />
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
